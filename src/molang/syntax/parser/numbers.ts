import { LexicalNode, ParseError, Token } from "../lexical/lexical";

export function simplifyNumbers(tokens: LexicalNode[]) {
  let index = 0;
  while (index < tokens.length) {
    const n = tokens[index];
    const next = tokens[index + 1]
    if (n.type === Token.number) {
      if (next && next.text === '.') {
        const thrid = tokens[index + 2];

        if (thrid === undefined || thrid.type !== Token.number) {
          throw new ParseError("found a decimal number, but nothing behind the dot", {}, n.offset, 0);
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
