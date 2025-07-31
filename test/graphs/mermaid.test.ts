import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { toBlocks } from "../../src/molang/syntax/lexical/blocks";
import { parse } from "../../src/molang/syntax/lexical/parsing";
import { blocksToMermaid } from "../../src/graphs/mermaid-blocks";
import { valid_syntaxes } from "../data/dataset";
import { parseMolang } from "../../src/molang/syntax/parse";
import { syntaxToStageDiagram } from "../../src/graphs/mermaid-syntax";

describe("mermiad block graphs", () => {
  describe("should be able generate a mermaid flowchart of lexical blocks", () => {
    test.each(valid_syntaxes)("%#. %s", (s) => {
      const tokens = parse(OffsetWord.create(s, 0));
      const blocks = toBlocks(tokens);

      blocks.forEach((item) => {
        expect(blocksToMermaid(item)).toMatchSnapshot();
      });
    });
  });
});

describe("mermiad state diagrams", () => {
  describe("should be able generate a mermaid stategiram of syntax", () => {
    test.each(valid_syntaxes)("%#. %s", (s) => {
      const statements = parseMolang(OffsetWord.create(s));

      statements.forEach((item) => {
        expect(syntaxToStageDiagram(item)).toMatchSnapshot();
      });
    });
  });
});
