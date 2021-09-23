import { expect } from "chai";
import { Molang } from "../../src/Molang/include";
import { VanillaPlayer } from "../Player.test";

describe("molang", () => {
  describe("contexts", () => {
    it("using", () => {
      let receiver: string[] = [];

      Molang.Context.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(["world_x"]);
    });

    it("using obj", () => {
      let receiver: string[] = [];

      Molang.Context.getUsing(VanillaPlayer.DataOBject, receiver);

      expect(receiver).to.contain.members(["world_x"]);
    });
  });
});
