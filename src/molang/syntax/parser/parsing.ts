import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { parseLexical } from "../lexical/lexical";
import { identify } from "../lexical/identify";

export function parse(line: OffsetWord) {
  const tokens = parseLexical(line);

  identify(tokens);

  return tokens;
}
