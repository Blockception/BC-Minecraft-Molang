import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { parseMolang } from "../../src/molang/syntax/parse";
import { valid_syntaxes } from "../data/dataset";
import { generateMermaidDiagram } from "../../src/graph/mermaid";

describe("molang - mermaid - graphs", () => {
  describe("should be able to generate stage diagrams", () => {
    test.each(valid_syntaxes)("%#. %s", (s) => {
      const n = parseMolang(OffsetWord.create(s, 0));

      n.forEach((item) => {
        expect(
          generateMermaidDiagram(item, {
            direction: "LR",
            showPosition: true,
          })
        ).toMatchSnapshot();
      });
    });
  });
});
