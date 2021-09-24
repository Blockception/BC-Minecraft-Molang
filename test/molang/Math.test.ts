import { expect } from "chai";
import { Molang } from "../../src/Molang/include";
import { VanillaPlayer } from "../Player.test";

describe("molang", () => {
  describe("math", () => {
    it("using", () => {
      let receiver: string[] = [];

      Molang.Math.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(["sin", "sqrt", "cos", "clamp", "pow"]);
    });

    it("using obj", () => {
      let receiver: string[] = [];

      Molang.Math.getUsing(VanillaPlayer.DataOBject, receiver);

      expect(receiver).to.contain.members(["sin", "sqrt", "cos", "clamp", "pow"]);
    });
  });
});
