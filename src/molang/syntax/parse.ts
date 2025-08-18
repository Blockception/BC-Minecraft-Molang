import { Types } from "bc-minecraft-bedrock-types";
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
  StringLiteralNode,
  UnaryOperationNode,
  VariableNode,
} from "./nodes";
import { Token, TokenType, tokenize } from "./tokens";
import { getMatchingTokenSlice } from "./util";
import { SyntaxBuilder } from "./builder";
import { MolangSyntaxError } from "./errors";
import { processOperators } from "./operators";

/** Main function to parse Molang code into a syntax tree */
export function parseMolang(line: Types.OffsetWord): ExpressionNode[] {
  const tokens = tokenize(line.text);
  tokens.forEach((t) => (t.position += line.offset));
  const statements = splitTokens(tokens, (item) => item.type === TokenType.Semicolon).filter((t) => t.length > 0);

  // Parse each statement
  return statements
    .map(trimEnding)
    .filter((item) => item.length > 0 && item[0].type !== TokenType.EOF)
    .map(parseTokens);
}

/**
 * Converts the given tokens into nodes
 * @param tokens
 * @returns
 */
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
      i = cdata.startIndex - 1;
      n = cdata.node;
    }
    builder.add(n);

    // Check for parenthese, brackets and braces
    if (
      Token.oneOfType(t, TokenType.NamespacedIdentifier) &&
      Token.oneOfType(tokens[i + 1], TokenType.OpenBrace, TokenType.OpenBracket, TokenType.OpenParen)
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

  return builder.build();
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
            scope: parts[0],
            arguments: [],
            position: token.position,
          });
        case "texture":
        case "material":
        case "geometry":
          return ResourceReferenceNode.create({
            position: token.position,
            scope: parts[0],
            names: parts.slice(1) as [string],
          });
        case "temp":
        case "t":
        case "variable":
        case "v":
        case "context":
        case "c":
        case "array":
          return VariableNode.create({
            names: parts.slice(1) as [string],
            position: token.position,
            scope: parts[0],
          });
        case "return":
          return UnaryOperationNode.create({
            operator: token.value,
            position: token.position,
            operand: {} as ExpressionNode,
          })
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
    `don't know how to process this token: ['${current.value}' ${TokenType[current.type]}]`
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
