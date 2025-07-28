import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { parse } from "./parser/parsing";
import { buildTree } from "./treebuilder";

export function parseMolang(line: OffsetWord) {
  const tokens = parse(line);
  return buildTree(tokens);
}
