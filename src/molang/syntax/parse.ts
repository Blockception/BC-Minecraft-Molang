import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { toBlocks } from "./lexical/blocks";
import { parse } from "./lexical/parsing";

export function parseMolang(line: OffsetWord) {
  const tokens = parse(line);
  const blocks = toBlocks(tokens);
  return blocks;
}
