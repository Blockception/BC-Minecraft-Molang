import { LexicalNode, ParseError, Token } from "./lexical";
import { isLetter, isNumber } from "./util";

export function identify(tokens: LexicalNode[]) {
  for (let i = 0; i < tokens.length; i++) {
    const n = tokens[i];
    if (n.type !== Token.unknown) continue;

    n.type = simpleIdentify(n.text);
    if (n.type !== Token.unknown) continue;

    // Advanced identify
    switch (n.text) {
      // Keywords that we know and that we can expect from the next
      case "context":
      case "geometry":
      case "m":
      case "material":
      case "math":
      case "q":
      case "query":
      case "t":
      case "temp":
      case "texture":
      case "variable":
      case "this":
      case "array":
        n.type = Token.keyword;
        const next = tokens[i + 1];
        // Next node need to be defined and either . or -> operator
        if (!textOneOf(next, ".", "->")) {
          throw new ParseError(n.offset, "expected a . or -> after " + n.text);
        } else {
          next.type = Token.access;
          i++;

          // node after that is an identifier
          const thrid = tokens[i + 1];
          if (!typeOneOf(thrid, Token.unknown, Token.identifier)) {
            throw new ParseError(n.offset, `unexpected ${Token[n.type]}`);
          } else {
            thrid.type = Token.identifier;
            i++;
          }

          continue;
        }
    }

    // Check for <keyword>.<identifier> or <keyword>-><identifier>
    const prev = tokens[i - 1];
    if (prev) {
      if (prev.type === Token.access) {
        n.type = Token.identifier;
        continue;
      }
      if ((prev.type === Token.keyword || prev.type === Token.identifier) && (n.text === "." || n.text === "->")) {
        n.type = Token.access;
        continue;
      }
    }

    // Constants?
    let numbers = true;
    let letters = true;
    const text = n.text.trim();
    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      numbers = numbers && isNumber(c);
      letters = letters && isLetter(c);

      if (!letters && !numbers) break;
    }

    if (numbers && !letters) n.type = Token.number;
    if (letters && !numbers) n.type = Token.text;

    // Last chance
    switch (n.text) {
      case ";":
        n.type = Token.end;
        break;
      case ".":
      case ",":
        n.type = Token.punction;
        break;
    }
  }
}

function simpleIdentify(text: string): Token {
  switch (text) {
    // Other Keywords
    case "loop":
    case "for_each":
    case "continu":
    case "return":
    case "break":
      return Token.keyword;

    // Operators
    case "=":
      return Token.assignment;
    case "*":
    case "/":
    case "+":
    case "-":
    case "!":
    case "||":
    case "&&":
      return Token.operator;
    case "<":
    case "<=":
    case ">=":
    case ">":
    case "==":
    case "!=":
      return Token.compare;
    case "->":
      return Token.access;
  }

  return Token.unknown;
}

function textOneOf(node: LexicalNode | undefined, ...items: string[]): boolean {
  if (node === undefined) return false;
  return items.includes(node.text);
}

function typeOneOf(node: LexicalNode | undefined, ...items: Token[]): boolean {
  if (node === undefined) return false;
  return items.includes(node.type);
}
