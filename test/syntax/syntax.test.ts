import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { parseMolang } from "../../src/molang/syntax/parse";
import { valid_syntaxes } from "../data/dataset";

describe("molang - syntax", () => {
  describe("should be able to parse and match the syntax tree generated", () => {
    test.each(valid_syntaxes)("%#. %s", (s) => {
      const n = parseMolang(OffsetWord.create(s, 0));
      expect(n).toMatchSnapshot();
    });
  });
});
