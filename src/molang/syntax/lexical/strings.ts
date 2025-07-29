import { LexicalNode, ParseError, Token } from "./lexical";

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
        throw new ParseError(n.offset, "couldn't find the end of the string");
      }
    }

    index++;
  }

  return tokens;
}
