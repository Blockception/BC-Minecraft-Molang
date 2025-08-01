import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { ExpressionNode, FunctionNamespace, NodeType, VariableScope } from "./nodes";
import { Token, TokenType, tokenize } from "./tokens";

/** Represents a syntax error in the Molang code */
export class MolangSyntaxError extends Error {
  constructor(message: string, public position: number, public code: string) {
    super(message);
    this.name = "MolangSyntaxError";
  }
}

/** Split a token stream into separate statements based on semicolons */
function splitTokensIntoStatements(tokens: Token[]): Token[][] {
  const statements: Token[][] = [];
  let startIndex = 0;

  // Find all semicolons and split on their positions
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === TokenType.Semicolon) {
      // Only add if there are tokens between the splits
      if (i > startIndex) {
        statements.push(tokens.slice(startIndex, i));
      }
      startIndex = i + 1;
    }
  }

  // Add the remaining tokens if they exist (and aren't EOF)
  const remaining = tokens.slice(startIndex);
  if (remaining.length > 0 && remaining[remaining.length - 1].type === TokenType.EOF) {
    remaining.pop(); // Remove EOF token
  }
  if (remaining.length > 0) {
    statements.push(remaining);
  }

  return statements;
}

/** Main function to parse Molang code into a syntax tree */
export function parseMolang(line: OffsetWord): ExpressionNode[] {
  const tokens = tokenize(line.text);
  const statements = splitTokensIntoStatements(tokens);

  // Parse each statement
  return statements.map((statementTokens) => {
    const parser = new MolangParser(statementTokens, line.offset);
    return parser.parse();
  });
}

/** Parser class to convert tokens into a syntax tree */
class MolangParser {
  private currentTokenIndex = 0;

  constructor(private tokens: Token[], private baseOffset: number) {}

  parse(): ExpressionNode {
    return this.parseAssignment();
  }

  private parseAssignment(): ExpressionNode {
    const expr = this.parseConditional();
    if (this.match(TokenType.Assignment)) {
      const value = this.parseAssignment(); // Right associative
      return {
        type: NodeType.Assignment,
        left: expr,
        right: value,
        position: expr.position,
      };
    }
    return expr;
  }

  private parseConditional(): ExpressionNode {
    const expr = this.parseLogicalOr();
    if (this.match(TokenType.QuestionMark)) {
      const trueExpr = this.parseExpression();
      this.consume(TokenType.Colon, "Expected ':' after true expression");
      const falseExpr = this.parseConditional();
      return {
        type: NodeType.Conditional,
        condition: expr,
        trueExpression: trueExpr,
        falseExpression: falseExpr,
        position: expr.position,
      };
    }
    return expr;
  }

  private parseLogicalOr(): ExpressionNode {
    let expr = this.parseLogicalAnd();
    while (this.match(TokenType.Operator) && this.previous().value === "||") {
      const right = this.parseLogicalAnd();
      expr = {
        type: NodeType.BinaryOperation,
        operator: "||",
        left: expr,
        right,
        position: expr.position,
      };
    }
    return expr;
  }

  private parseLogicalAnd(): ExpressionNode {
    let expr = this.parseEquality();
    while (this.match(TokenType.Operator) && this.previous().value === "&&") {
      const right = this.parseEquality();
      expr = {
        type: NodeType.BinaryOperation,
        operator: "&&",
        left: expr,
        right,
        position: expr.position,
      };
    }
    return expr;
  }

  private parseEquality(): ExpressionNode {
    let expr = this.parseComparison();
    while (this.match(TokenType.Operator) && (this.previous().value === "==" || this.previous().value === "!=")) {
      const operator = this.previous().value;
      const right = this.parseComparison();
      expr = {
        type: NodeType.BinaryOperation,
        operator,
        left: expr,
        right,
        position: expr.position,
      };
    }
    return expr;
  }

  private parseComparison(): ExpressionNode {
    let expr = this.parseTerm();
    while (
      this.match(TokenType.Operator) &&
      (this.previous().value === "<" ||
        this.previous().value === ">" ||
        this.previous().value === "<=" ||
        this.previous().value === ">=")
    ) {
      const operator = this.previous().value;
      const right = this.parseTerm();
      expr = {
        type: NodeType.BinaryOperation,
        operator,
        left: expr,
        right,
        position: expr.position,
      };
    }
    return expr;
  }

  private parseTerm(): ExpressionNode {
    let expr = this.parseFactor();
    while (this.match(TokenType.Operator) && (this.previous().value === "+" || this.previous().value === "-")) {
      const operator = this.previous().value;
      const right = this.parseFactor();
      expr = {
        type: NodeType.BinaryOperation,
        operator,
        left: expr,
        right,
        position: expr.position,
      };
    }
    return expr;
  }

  private parseFactor(): ExpressionNode {
    let expr = this.parseUnary();
    while (this.match(TokenType.Operator) && (this.previous().value === "*" || this.previous().value === "/")) {
      const operator = this.previous().value;
      const right = this.parseUnary();
      expr = {
        type: NodeType.BinaryOperation,
        operator,
        left: expr,
        right,
        position: expr.position,
      };
    }
    return expr;
  }

  private parseUnary(): ExpressionNode {
    if (this.match(TokenType.UnaryOperator) || (this.match(TokenType.Operator) && this.previous().value === "-")) {
      const operator = this.previous().value;
      const operand = this.parseUnary();
      return {
        type: NodeType.UnaryOperation,
        operator,
        operand,
        position: this.makePosition(this.previous().position),
      };
    }
    return this.parsePrimary();
  }

  private parseExpression(): ExpressionNode {
    return this.parseAssignment();
  }

  private parsePrimary(): ExpressionNode {
    if (this.match(TokenType.Number)) {
      return {
        type: NodeType.Literal,
        value: parseFloat(this.previous().value),
        position: this.makePosition(this.previous().position),
      };
    }

    if (this.match(TokenType.StringLiteral)) {
      return {
        type: NodeType.StringLiteral,
        value: this.previous().value,
        position: this.makePosition(this.previous().position),
      };
    }

    if (this.match(TokenType.NamespacedIdentifier)) {
      const fullId = this.previous().value;
      const [scope, ...parts] = fullId.split(".");
      const name = parts.join(".");
      const position = this.makePosition(this.previous().position);

      // Check if it's a function call
      if (this.check(TokenType.OpenParen)) {
        return this.parseFunction(scope, name, position);
      }

      // It's a variable reference
      // Validate scope is one of the allowed values
      if (!this.isValidVariableScope(scope)) {
        throw this.error(`Invalid variable scope: ${scope}`);
      }

      return {
        type: NodeType.Variable,
        scope: scope as VariableScope,
        name,
        position,
      };
    }

    if (this.match(TokenType.OpenParen)) {
      const expr = this.parseExpression();
      this.consume(TokenType.CloseParen, "Expected ')' after expression");
      return expr;
    }

    throw this.error("Expected expression");
  }

  private isValidVariableScope(scope: string): scope is VariableScope {
    return ["temp", "variable", "context", "array"].includes(scope);
  }

  private isValidFunctionNamespace(namespace: string): namespace is FunctionNamespace {
    return ["math", "query"].includes(namespace);
  }

  private parseFunction(namespace: string, name: string, position: number): ExpressionNode {
    this.consume(TokenType.OpenParen, "Expected '(' after function name");

    const args: ExpressionNode[] = [];
    if (!this.check(TokenType.CloseParen)) {
      do {
        args.push(this.parseExpression());
      } while (this.match(TokenType.Comma));
    }

    this.consume(TokenType.CloseParen, "Expected ')' after arguments");

    // Validate namespace is one of the allowed values
    if (!this.isValidFunctionNamespace(namespace)) {
      throw this.error(`Invalid function namespace: ${namespace}`);
    }

    return {
      type: NodeType.FunctionCall,
      namespace: namespace as FunctionNamespace,
      name,
      arguments: args,
      position,
    };
  }

  private makePosition(offset: number): number {
    // Add the base offset from OffsetWord to get absolute position
    return this.baseOffset + offset;
  }

  private error(message: string): MolangSyntaxError {
    const pos = this.makePosition(this.peek().position);
    return new MolangSyntaxError(message, pos, this.tokens[this.currentTokenIndex]?.value || "");
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.currentTokenIndex];
  }

  private previous(): Token {
    return this.tokens[this.currentTokenIndex - 1];
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.currentTokenIndex++;
    return this.previous();
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    throw this.error(message);
  }

  private match(type: TokenType): boolean {
    if (this.check(type)) {
      this.advance();
      return true;
    }
    return false;
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }
}
