import { LexicalNode, ParseError, Token } from "../lexical/lexical";

export function simplifyString(tokens: LexicalNode[]) {
  let index = 0;
  while (index < tokens.length) {
    const n = tokens[index];
    if (n.text === '"' || n.text === "'") {
      const endIndex = tokens.slice(index + 1).findIndex((item) => item.text === n.text);
      if (endIndex > -1) {
        n.text = tokens
          .slice(index, endIndex + index + 2)
          .map((item) => item.text)
          .reduce((prev, cur) => prev + cur);
        n.type = Token.text;
        tokens.splice(index + 1, endIndex + 1);
      } else {
        throw new ParseError("couldn't find the end of the string", {}, n.offset, 0);
      }
    }

    index++;
  }

  return tokens;
}
