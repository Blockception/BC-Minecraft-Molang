import { LexicalNode, ParseError, Token } from "./lexical";

export function identify(tokens: LexicalNode[]) {
  let unknownleft = 0;

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
          throw new ParseError("expected a . or -> after " + n.text, {}, n.offset, 0);
        } else {
          next.type = Token.access;
          i++;

          // node after that is an identifier
          const thrid = tokens[i + 1];
          if (!typeOneOf(thrid, Token.unknown, Token.identifier)) {
            throw new ParseError(`unexpected ${Token[n.type]}`, {}, n.offset, 0);
          } else {
            thrid.type = Token.identifier;
            i++;
          }

          continue;
        }
    }

    unknownleft++;
  }

  // Nothing left? earlier exit
  if (unknownleft === 0) return;
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
    case "*":
    case "/":
    case "+":
    case "-":
    case "!":
    case "||":
    case "&&":
    case "<":
    case "<=":
    case ">=":
    case ">":
    case "==":
    case "!=":
      return Token.operator;
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
