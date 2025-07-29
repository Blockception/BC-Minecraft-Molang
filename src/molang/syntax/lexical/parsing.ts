import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { parseLexical } from "./lexical";
import { identify } from "./identify";
import { simplifyString } from "./strings";
import { simplifyNumbers } from "./numbers";

export function parse(line: OffsetWord) {
  let tokens = parseLexical(line);

  identify(tokens);

  // Simplifications,
  tokens = simplifyString(tokens);
  // Trim
  tokens.forEach((item) => {
    item.text = item.text.trimEnd();
    const t = item.text.trimStart();
    if (t.length != item.text.length) {
      item.offset += item.text.length - t.length;
      item.text = t;
    }
  });
  // - correcting decimal numbers
  tokens = simplifyNumbers(tokens);
  tokens = tokens.filter((item) => item.text.length !== 0);

  return tokens;
}
