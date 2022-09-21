import { expect } from "chai";
import { Types } from '../../../src/Molang/';
import { VanillaPlayer } from "../../Player.test";

describe("Molang", () => {
  describe("math", () => {
    it("using", () => {
      let receiver: string[] = [];

      Types.Math.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(["sin", "sqrt", "cos", "clamp", "pow"]);
    });

    it("using obj", () => {
      let receiver: string[] = [];

      Types.Math.getUsing(VanillaPlayer.DataOBject, receiver);

      expect(receiver).to.contain.members(["sin", "sqrt", "cos", "clamp", "pow"]);
    });
  });
});
