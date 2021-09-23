import { VanillaPlayer } from "../Player.test";
import { expect } from "chai";
import { RegularExpression } from "../../src/Molang/RegExp";
import { Molang } from "../../src/main";

describe("Sets", () => {
  it("Full Using", () => {
    const receiver: string[] = [];
    RegularExpression.harvest(VanillaPlayer.Data, Molang.Sets.getFullUsedPatt, receiver);
    for (let I = 0; I < receiver.length; I++) {
      const type = receiver[I++];
      const value = receiver[I];

      if (type && value) {
        expect(typeof value).to.equal("string");

        switch (type.toLowerCase()) {
          case "c":
          case "context":
          case "v":
          case "variable":
          case "t":
          case "temp":
          case "q":
          case "query":
          case "math":
          case "texture":
          case "geometry":
          case "material":
            break;

          default:
            expect.fail("unknown type: " + type);
        }
      }
    }
  });
});
