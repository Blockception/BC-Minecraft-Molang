/** Represents a token in the Molang code */
export interface Token {
  type: TokenType;
  value: string;
  position: number;
}

export namespace Token {
  export function oneOfType(t: Pick<Token, "type"> | undefined, ...params: TokenType[]): boolean {
    if (t === undefined) return false;

    return params.includes(t.type);
  }
}

export enum TokenType {
  ArrayAccess,
  Arrow,
  Assignment,
  CloseBrace,
  CloseBracket,
  CloseParen,
  Colon,
  Comma,
  Dot,
  Identifier,
  NamespacedIdentifier,
  NullishCoalescing,
  Number,
  OpenBrace,
  OpenBracket,
  OpenParen,
  Operator,
  QuestionMark,
  Semicolon,
  StringLiteral,
  UnaryOperator,
  EOF,
}

function isDigit(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return code >= 48 && code <= 57; // 0-9
}

function isAlpha(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return (
    (code >= 65 && code <= 90) || // A-Z
    (code >= 97 && code <= 122) || // a-z
    ch === "_"
  );
}

function isAlphaNumeric(ch: string): boolean {
  return isAlpha(ch) || isDigit(ch);
}

/** Tokenizes Molang code into a sequence of tokens */
export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;

  while (pos < input.length) {
    const char = input[pos];

    // Skip whitespace
    switch (char) {
      case " ":
      case "\t":
      case "\r":
      case "\n":
        pos++;
        continue;
    }

    // Numbers
    if (isDigit(char)) {
      let value = "";
      const start = pos;

      while (pos < input.length && (isDigit(input[pos]) || input[pos] === ".")) {
        value += input[pos];
        pos++;
      }

      if (input[pos] === "f") {
        value += input[pos];
        pos++;
      }

      tokens.push({ type: TokenType.Number, value, position: start });
      continue;
    }

    // Identifiers (including namespaced ones like math.sin and minecraft:state)
    if (isAlpha(char)) {
      let value = "";
      const start = pos;

      while (pos < input.length) {
        const ch = input[pos];
        // Allow alphanumeric, dots, underscores, and colons in identifiers
        if (isAlphaNumeric(ch) || ch === "." || ch === ":") {
          value += ch;
          pos++;
        } else {
          break;
        }
      }

      // If it contains a dot, it's a namespaced identifier
      if (value.includes(".")) {
        tokens.push({ type: TokenType.NamespacedIdentifier, value: value.toLowerCase(), position: start });
      } else {
        tokens.push({ type: TokenType.Identifier, value: value.toLowerCase(), position: start });
      }
      continue;
    }

    // Multi-character operators
    const threeCharOp = input.slice(pos, pos + 3);
    if (threeCharOp === "???") {
      tokens.push({ type: TokenType.NullishCoalescing, value: threeCharOp, position: pos });
      pos += 3;
      continue;
    }

    const twoCharOp = input.slice(pos, pos + 2);
    switch (twoCharOp) {
      case "&&":
      case "||":
      case "==":
      case "!=":
      case "<=":
      case ">=":
      case "->":
        tokens.push({ type: TokenType.Operator, value: twoCharOp, position: pos });
        pos += 2;
        continue;
      case "??":
        tokens.push({ type: TokenType.NullishCoalescing, value: twoCharOp, position: pos });
        pos += 2;
        continue;
      default:
    }

    // Single-character operators and punctuation
    switch (char) {
      case "(":
        tokens.push({ type: TokenType.OpenParen, value: char, position: pos });
        break;
      case ")":
        tokens.push({ type: TokenType.CloseParen, value: char, position: pos });
        break;
      case "{":
        tokens.push({ type: TokenType.OpenBrace, value: char, position: pos });
        break;
      case "}":
        tokens.push({ type: TokenType.CloseBrace, value: char, position: pos });
        break;
      case "[":
        tokens.push({ type: TokenType.OpenBracket, value: char, position: pos });
        break;
      case "]":
        tokens.push({ type: TokenType.CloseBracket, value: char, position: pos });
        break;
      case ";":
        tokens.push({ type: TokenType.Semicolon, value: char, position: pos });
        break;
      case "?":
        tokens.push({ type: TokenType.QuestionMark, value: char, position: pos });
        break;
      case ":":
        tokens.push({ type: TokenType.Colon, value: char, position: pos });
        break;
      case ".":
        tokens.push({ type: TokenType.Dot, value: char, position: pos });
        break;
      case "=":
        tokens.push({ type: TokenType.Assignment, value: char, position: pos });
        break;
      case "!":
        tokens.push({ type: TokenType.UnaryOperator, value: char, position: pos });
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "<":
      case ">":
        tokens.push({ type: TokenType.Operator, value: char, position: pos });
        break;
      case ",":
        tokens.push({ type: TokenType.Comma, value: char, position: pos });
        break;
      case "'":
      case '"':
        // Handle string literals
        const quote = char;
        const start = pos;
        pos++;
        let value = "";
        while (pos < input.length && input[pos] !== quote) {
          // Capture everything inside quotes including special characters
          value += input[pos];
          pos++;
        }
        if (pos >= input.length) {
          throw new Error(`Unterminated string literal starting at position ${start}`);
        }
        pos++; // Skip closing quote
        tokens.push({
          type: TokenType.StringLiteral,
          value: value, // Use accumulated value instead of slicing
          position: start,
        });
        continue; // Use continue instead of break to avoid the pos++ at the end of switch
      default:
        throw new Error(`Unexpected character at position ${pos}: ${char}`);
    }
    pos++;
    continue;
  }

  // Always add an EOF token at the end
  tokens.push({ type: TokenType.EOF, value: " ", position: pos });

  // Check for unary operators
  tokens.forEach(checkUnaryOperators);

  return tokens;
}

function checkUnaryOperators(item: Token, index: number, items: Token[]) {
  if (item.type === TokenType.Identifier && item.value === "return") {
    item.type = TokenType.UnaryOperator;
    return;
  }
  if (item.type !== TokenType.Operator && item.value !== "-") return;

  if (index === 0) {
    item.type = TokenType.UnaryOperator;
    return;
  }
  const previous = items[index - 1];
  switch (previous.type) {
    case TokenType.Comma:
    case TokenType.Operator:
    case TokenType.OpenBrace:
    case TokenType.OpenBracket:
    case TokenType.OpenParen:
      item.type = TokenType.UnaryOperator;
      break;
    default:
  }
}
