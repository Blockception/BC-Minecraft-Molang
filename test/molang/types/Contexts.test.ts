import { expect } from "chai";
import { Types } from '../../../src/Molang/';
import { VanillaPlayer } from "../../Player.test";

describe("Molang", () => {
  describe("Contexts", () => {
    it("Using", () => {
      let receiver: string[] = [];

      Types.Context.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(["world_x"]);
    });

    it("Using obj", () => {
      let receiver: string[] = [];

      Types.Context.getUsing(VanillaPlayer.DataOBject, receiver);

      expect(receiver).to.contain.members(["world_x"]);
    });
  });
});
