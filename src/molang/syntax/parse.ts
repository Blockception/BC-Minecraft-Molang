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

/** Operator precedence and associativity configuration */
interface OperatorInfo {
  precedence: number;
  rightAssociative?: boolean;
  unary?: boolean;
}

const OPERATORS: Record<string, OperatorInfo> = {
  // Assignment (lowest precedence)
  "=": { precedence: 1, rightAssociative: true },
  
  // Conditional (ternary)
  "?": { precedence: 2, rightAssociative: true },
  ":": { precedence: 2, rightAssociative: true },
  
  // Logical OR
  "||": { precedence: 3 },
  
  // Logical AND
  "&&": { precedence: 4 },
  
  // Equality
  "==": { precedence: 5 },
  "!=": { precedence: 5 },
  
  // Comparison
  "<": { precedence: 6 },
  ">": { precedence: 6 },
  "<=": { precedence: 6 },
  ">=": { precedence: 6 },
  
  // Addition/Subtraction
  "+": { precedence: 7 },
  "-": { precedence: 7 },
  
  // Multiplication/Division (highest precedence for binary ops)
  "*": { precedence: 8 },
  "/": { precedence: 8 },
  
  // Unary operators
  "!": { precedence: 9, unary: true },
  "-u": { precedence: 9, unary: true }, // Unary minus (distinguished from binary)
};

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

/** Parser class to convert tokens into a syntax tree using iterative parsing */
class MolangParser {
  private currentTokenIndex = 0;

  constructor(private tokens: Token[], private baseOffset: number) {}

  parse(): ExpressionNode {
    return this.parseExpression();
  }

  /** Main expression parsing using iterative precedence climbing */
  private parseExpression(minPrecedence: number = 0): ExpressionNode {
    let left = this.parsePrimary();

    while (!this.isAtEnd()) {
      const token = this.peek();
      
      // Handle ternary conditional operator specially
      if (token.type === TokenType.QuestionMark) {
        const opInfo = OPERATORS["?"];
        if (opInfo.precedence < minPrecedence) break;
        
        this.advance(); // consume '?'
        const trueExpr = this.parseExpression();
        this.consume(TokenType.Colon, "Expected ':' after true expression");
        const falseExpr = this.parseExpression(opInfo.precedence);
        
        left = {
          type: NodeType.Conditional,
          condition: left,
          trueExpression: trueExpr,
          falseExpression: falseExpr,
          position: left.position,
        };
        continue;
      }

      // Handle assignment
      if (token.type === TokenType.Assignment) {
        const opInfo = OPERATORS["="];
        if (opInfo.precedence < minPrecedence) break;
        
        this.advance(); // consume '='
        const nextMinPrec = opInfo.rightAssociative ? opInfo.precedence : opInfo.precedence + 1;
        const right = this.parseExpression(nextMinPrec);
        
        left = {
          type: NodeType.Assignment,
          left,
          right,
          position: left.position,
        };
        continue;
      }

      // Handle binary operators
      if (token.type === TokenType.Operator) {
        const operator = token.value;
        const opInfo = OPERATORS[operator];
        
        if (!opInfo || opInfo.unary || opInfo.precedence < minPrecedence) break;
        
        this.advance(); // consume operator
        const nextMinPrec = opInfo.rightAssociative ? opInfo.precedence : opInfo.precedence + 1;
        const right = this.parseExpression(nextMinPrec);
        
        left = {
          type: NodeType.BinaryOperation,
          operator,
          left,
          right,
          position: left.position,
        };
        continue;
      }

      // No more operators to process
      break;
    }

    return left;
  }

  /** Parse primary expressions and unary operators */
  private parsePrimary(): ExpressionNode {
    // Handle unary operators
    const token = this.peek();
    
    if (token.type === TokenType.UnaryOperator || 
        (token.type === TokenType.Operator && token.value === "-")) {
      
      const operator = token.value === "-" ? "-u" : token.value; // Distinguish unary minus
      const opInfo = OPERATORS[operator];
      
      if (opInfo?.unary) {
        this.advance(); // consume operator
        const operand = this.parseExpression(opInfo.precedence);
        
        return {
          type: NodeType.UnaryOperation,
          operator: token.value, // Use original operator value
          operand,
          position: this.makePosition(token.position),
        };
      }
    }

    // Handle literals and identifiers
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
    switch (scope) {
      case "temp":
      case "variable":
      case "context":
      case "array":
        return true;
      default:
        return false;
    }
  }

  private isValidFunctionNamespace(namespace: string): namespace is FunctionNamespace {
    switch (namespace) {
      case "math":
      case "query":
        return true;
      default:
        return false;
    }
  }

  private parseFunction(namespace: string, name: string, position: number): ExpressionNode {
    this.consume(TokenType.OpenParen, "Expected '(' after function name");

    const args: ExpressionNode[] = [];
    if (!this.check(TokenType.CloseParen)) {
      // Parse arguments iteratively
      args.push(this.parseExpression());
      
      while (this.match(TokenType.Comma)) {
        args.push(this.parseExpression());
      }
    }

    this.consume(TokenType.CloseParen, "Expected ')' after arguments");

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