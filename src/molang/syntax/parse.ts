import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { Token, TokenType, tokenize } from "./tokens";
import {
  ArrayAccessNode,
  AssignmentNode,
  BinaryOperationNode,
  ConditionalExpressionNode,
  ExpressionNode,
  FunctionCallNode,
  LiteralNode,
  MarkerNode,
  NodeType,
  NullishCoalescingNode,
  ResourceReferenceNode,
  StatementSequenceNode,
  StringLiteralNode,
  UnaryOperationNode,
  VariableNode,
} from "./nodes";

/** Represents a syntax error in the Molang code */
export class MolangSyntaxError extends Error {
  constructor(message: string, public position: number, public code: string) {
    super(message);
    this.name = "MolangSyntaxError";
  }

  static fromToken(token: Token, message: string) {
    return new MolangSyntaxError(message, token.position, token.value);
  }
  static fromTokens(tokens: Token[], message: string) {
    return new MolangSyntaxError(message, tokens[0].position, tokens.map((i) => i.value).join(""));
  }
}

/** Main function to parse Molang code into a syntax tree */
export function parseMolang(line: OffsetWord): ExpressionNode[] {
  const tokens = tokenize(line.text);
  const statements = splitTokens(tokens, (item) => item.type === TokenType.Semicolon).filter((t) => t.length > 0);

  // Parse each statement
  return statements
    .map(trimEnding)
    .filter((item) => item.length > 0 && item[0].type !== TokenType.EOF)
    .map(parseTokens);
}

class SyntaxBuilder {
  result: StatementSequenceNode;

  constructor(position: number) {
    this.result = {
      type: NodeType.StatementSequence,
      statements: [],
      position: position,
    };
  }

  add<T extends ExpressionNode>(node: T): T {
    if (node) this.result.statements.push(node);
    return node;
  }
  remove<T extends ExpressionNode>(node: T) {
    this.result.statements = this.result.statements.filter((item) => item !== node);
  }
  replace<T extends ExpressionNode, U extends ExpressionNode>(original: T, newnode: U): U {
    this.result.statements.forEach((item, index, nodes) => {
      if (item === original) {
        nodes[index] = newnode;
      }
    });
    return newnode;
  }
}

function parseTokens(tokens: Token[]) {
  tokens = trimBraces(tokens);
  tokens = trimEnding(tokens);
  if (tokens.length === 1) return convertToken(tokens[0]) ?? costlyConvertToken(tokens, 0).node;

  const builder = new SyntaxBuilder(tokens[0].position ?? 0);
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    const c = convertToken(t);
    let n: ExpressionNode;
    if (c) {
      n = c;
    } else {
      const cdata = costlyConvertToken(tokens, i);
      i = cdata.startIndex;
      n = cdata.node;
    }

    // Check for parenthese, brackets and braces
    if (
      (Token.oneOfType(t, TokenType.NamespacedIdentifier),
      Token.oneOfType(tokens[i + 1], TokenType.OpenBrace, TokenType.OpenBracket, TokenType.OpenParen))
    ) {
      const code = getMatchingTokenSlice(tokens, i + 1);
      const inner = trimBraces(code);
      const params = splitTokens(inner, (item) => item.type === TokenType.Comma);
      const bracketArgs = params.map(parseTokens);
      i += code.length; // move index to end

      switch (n.type) {
        case NodeType.FunctionCall:
          n.arguments = bracketArgs;
          break;
        case NodeType.ResourceReference:
          if (bracketArgs.length > 0) {
            throw MolangSyntaxError.fromToken(t, "unexpected function call after resource access");
          }
          break;
        case NodeType.Variable:
          if (bracketArgs.length > 1) {
            throw MolangSyntaxError.fromToken(t, "unexpected amount of parameters for array access");
          }
          if (!Token.oneOfType(code[0], TokenType.OpenBracket)) {
            throw MolangSyntaxError.fromToken(t, "unexpected function call after resource access");
          }
          builder.replace(
            n,
            ArrayAccessNode.create({
              position: n.position,
              array: n,
              index: bracketArgs[0],
            })
          );
          break;
      }
    }
  }

  //
  processOperators(builder);

  return builder.result;
}

function processOperators(builder: SyntaxBuilder) {
  
}

/** Filter () {} [] from start or finish if they match */
function trimBraces(tokens: Token[]): Token[] {
  if (tokens.length <= 1) return tokens;
  while (
    (tokens[0].type === TokenType.OpenBrace && tokens[tokens.length - 1].type === TokenType.CloseBrace) ||
    (tokens[0].type === TokenType.OpenBracket && tokens[tokens.length - 1].type === TokenType.CloseBracket) ||
    (tokens[0].type === TokenType.OpenParen && tokens[tokens.length - 1].type === TokenType.CloseParen)
  ) {
    tokens = tokens.slice(1, tokens.length - 1);
    if (tokens.length === 0) return tokens;
  }

  return tokens;
}

function trimEnding(tokens: Token[]): Token[] {
  // Filter off
  while (tokens[tokens.length - 1].type === TokenType.EOF || tokens[tokens.length - 1].type === TokenType.Semicolon) {
    tokens = tokens.slice(0, tokens.length - 1);
    if (tokens.length === 0) return tokens;
  }
  return tokens;
}

/**
 * Cheap converserions from tokens to nodes
 * @param token
 * @returns
 */
function convertToken(token: Token) {
  switch (token.type) {
    case TokenType.NamespacedIdentifier:
      const parts = token.value.split(".");

      switch (parts[0]) {
        case "q":
        case "math":
        case "query":
          return FunctionCallNode.create({
            names: parts.slice(1) as [string],
            namespace: parts[0],
            arguments: [],
            position: token.position,
          });
        case "texture":
        case "material":
        case "geometry":
          return ResourceReferenceNode.create({
            position: token.position,
            namespace: parts[0],
            names: parts.slice(1) as [string],
          });
        case "temp":
        case "v":
        case "variable":
        case "context":
        case "array":
          return VariableNode.create({
            names: parts.slice(1) as [string],
            position: token.position,
            scope: parts[0],
          });
      }
      break;

    case TokenType.Number:
      return LiteralNode.create({
        position: token.position,
        value: token.value,
      });
    case TokenType.StringLiteral:
      return StringLiteralNode.create({
        position: token.position,
        value: token.value,
      });
    case TokenType.Operator:
      return BinaryOperationNode.create({
        operator: token.value,
        position: token.position,
        left: {} as ExpressionNode,
        right: {} as ExpressionNode,
      });
    case TokenType.UnaryOperator:
      return UnaryOperationNode.create({
        operator: token.value,
        position: token.position,
        operand: {} as ExpressionNode,
      });
    case TokenType.Assignment:
      return AssignmentNode.create({
        position: token.position,
        left: {} as ExpressionNode,
        right: {} as ExpressionNode,
      });
    case TokenType.QuestionMark:
      return ConditionalExpressionNode.create({
        position: token.position,
        condition: {} as ExpressionNode,
        falseExpression: {} as ExpressionNode,
        trueExpression: {} as ExpressionNode,
      });
    case TokenType.Colon:
      return MarkerNode.create({
        position: token.position,
        token: token,
      });
    case TokenType.NullishCoalescing:
      return NullishCoalescingNode.create({
        position: token.position,
        left: {} as ExpressionNode,
        right: {} as ExpressionNode,
      });
  }

  return undefined;
}

/**
 * The more costly conversions, and the last restort, will throw an error if doesn't know what to do
 * @param tokens
 * @param startIndex
 */
function costlyConvertToken(tokens: Token[], startIndex: number): { node: ExpressionNode; startIndex: number } {
  const current = tokens[startIndex];

  switch (current.type) {
    case TokenType.OpenBrace:
    case TokenType.OpenBracket:
    case TokenType.OpenParen:
      const code = getMatchingTokenSlice(tokens, startIndex);
      return {
        node: parseTokens(code),
        startIndex: startIndex + code.length,
      };
  }

  throw MolangSyntaxError.fromToken(
    current,
    `don't know how to process this token: ${current.value} ${TokenType[current.type]}`
  );
}

function splitTokens(tokens: Token[], predicate: (item: Token) => boolean): Array<Array<Token>> {
  const result: Array<Array<Token>> = [];
  let startIndex = 0;

  let bracketIndex = 0;
  let parentIndex = 0;
  let braceIndex = 0;

  //loop
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    switch (t.type) {
      case TokenType.OpenBrace:
        braceIndex++;
        break;
      case TokenType.OpenParen:
        parentIndex++;
        break;
      case TokenType.OpenBracket:
        bracketIndex++;
        break;
      case TokenType.CloseBrace:
        braceIndex--;
        break;
      case TokenType.CloseParen:
        parentIndex--;
        break;
      case TokenType.CloseBracket:
        bracketIndex--;
        break;
    }

    if (bracketIndex > 0 || parentIndex > 0 || braceIndex > 0) continue;
    if (predicate(t)) {
      const left = tokens.slice(startIndex, i);
      result.push(left);
      startIndex = i + 1;
    }
  }

  // Validate
  if (bracketIndex > 0) throw MolangSyntaxError.fromTokens(tokens, "couldn't find the closing {");
  if (parentIndex > 0) throw MolangSyntaxError.fromTokens(tokens, "couldn't find the closing (");
  if (braceIndex > 0) throw MolangSyntaxError.fromTokens(tokens, "couldn't find the closing [");

  if (startIndex < tokens.length) {
    const left = tokens.slice(startIndex);
    result.push(left);
  }

  return result;
}

function getMatchingTokenSlice(tokens: Token[], startIndex: number): Token[] {
  if (startIndex >= tokens.length) {
    throw new Error("Start index is out of bounds");
  }

  const startToken = tokens[startIndex];
  let targetType: TokenType;
  let counterType: TokenType;

  // Determine what we're looking for based on the starting token
  switch (startToken.type) {
    case TokenType.OpenBrace:
      targetType = TokenType.CloseBrace;
      counterType = TokenType.OpenBrace;
      break;
    case TokenType.OpenParen:
      targetType = TokenType.CloseParen;
      counterType = TokenType.OpenParen;
      break;
    case TokenType.OpenBracket:
      targetType = TokenType.CloseBracket;
      counterType = TokenType.OpenBracket;
      break;
    default:
      throw new Error(`Token at index ${startIndex} is not an opening bracket, brace, or parenthesis`);
  }

  let level = 1; // We start with level 1 since we found the opening token
  let endIndex = -1;

  // Search for the matching closing token
  for (let i = startIndex + 1; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === counterType) {
      level++;
    } else if (token.type === targetType) {
      level--;
      if (level === 0) {
        endIndex = i;
        break;
      }
    }
  }

  // Validate that we found the matching closing token
  if (endIndex === -1) {
    const tokenName =
      startToken.type === TokenType.OpenBrace ? "{" : startToken.type === TokenType.OpenParen ? "(" : "[";
    const closingName = targetType === TokenType.CloseBrace ? "}" : targetType === TokenType.CloseParen ? ")" : "]";
    throw new Error(`Couldn't find the matching closing ${closingName} for ${tokenName} at index ${startIndex}`);
  }

  // Return the slice including both opening and closing tokens
  return tokens.slice(startIndex, endIndex + 1);
}
