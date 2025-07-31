import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { parseMolang } from "../../src/molang/syntax/parse";
import { convertToString } from "../../src/molang/syntax/node";
import { valid_syntaxes } from "../data/dataset";

describe("molang - syntax", () => {
  describe("should be able to parse and match the syntax tree generated", () => {
    test.each(valid_syntaxes.filter((s) => s.includes("&&")))("%#. %s", (s) => {
      const statements = parseMolang(OffsetWord.create(s, 0));

      statements.forEach((n) => {
        expect(convertToString(n)).toMatchSnapshot();
      });
    });
  });
});
