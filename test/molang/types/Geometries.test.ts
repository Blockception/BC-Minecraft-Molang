import { expect } from "chai";
import { Types } from '../../../src/Molang/include';
import { VanillaPlayer } from "../../Player.test";

describe("molang", () => {
  describe("geometries", () => {
    it("using", () => {
      let receiver: string[] = [];

      Types.Geometries.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(["humanoid.custom", "cape"]);
    });

    it("using obj", () => {
      let receiver: string[] = [];

      Types.Geometries.getUsing(VanillaPlayer.DataOBject, receiver);

      expect(receiver).to.contain.members(["humanoid.custom", "cape"]);
    });
  });
});
