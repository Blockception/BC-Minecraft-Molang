import { expect } from "chai";
import { Types } from '../../../src/Molang/';
import { VanillaPlayer } from "../../Player.test";

describe("molang", () => {
  describe("contexts", () => {
    it("using", () => {
      let receiver: string[] = [];

      Types.Context.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(["world_x"]);
    });

    it("using obj", () => {
      let receiver: string[] = [];

      Types.Context.getUsing(VanillaPlayer.DataOBject, receiver);

      expect(receiver).to.contain.members(["world_x"]);
    });
  });
});
