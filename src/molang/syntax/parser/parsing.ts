import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { parseLexical } from "../lexical/lexical";
import { identify } from "../lexical/identify";

export function parse(line: OffsetWord) {
  const tokens = parseLexical(line);

  identify(tokens);

  // TODO: Simplifications,
  // - such as collectors of strings
  // - correcting decimal numbers
  // - trimming emty whitespace

  return tokens;
}
