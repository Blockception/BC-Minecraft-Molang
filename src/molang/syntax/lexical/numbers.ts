import { LexicalNode, ParseError, Token } from "./lexical";

export function simplifyNumbers(tokens: LexicalNode[]) {
  let index = 0;
  while (index < tokens.length) {
    const n = tokens[index];
    const next = tokens[index + 1]
    if (n.type === Token.number) {
      if (next && next.text === '.') {
        const thrid = tokens[index + 2];

        if (thrid === undefined || thrid.type !== Token.number) {
          throw new ParseError(n.offset, "found a decimal number, but nothing behind the dot");
        } else {
          n.text = n.text + '.' + thrid.text;
          tokens.splice(index + 1, 2);
        }
      }
    }
  
    index++;
  }
  return tokens;
}
