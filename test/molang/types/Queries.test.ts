import { expect } from "chai";
import { Types } from '../../../src/Molang/';
import { VanillaPlayer } from "../../Player.test";

describe("Molang", () => {
  describe("queries", () => {
    it("using", () => {
      let receiver: string[] = [];

      Types.Queries.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(["modified_distance_moved", "life_time", "main_hand_item_use_duration", "main_hand_item_max_duration", "is_alive"]);
    });

    it("using obj", () => {
      let receiver: string[] = [];

      Types.Queries.getUsing(VanillaPlayer.DataOBject, receiver);

      expect(receiver).to.contain.members(["modified_distance_moved", "life_time", "main_hand_item_use_duration", "main_hand_item_max_duration", "is_alive"]);
    });
  });
});
