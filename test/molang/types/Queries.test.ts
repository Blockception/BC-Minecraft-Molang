import { Types } from "../../../src/molang";
import { VanillaPlayer } from "../../vanilla-player";

describe("Molang", () => {
  describe("queries", () => {
    it("using", () => {
      const receiver: string[] = [];

      Types.Queries.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).toEqual(
        expect.arrayContaining([
          "modified_distance_moved",
          "life_time",
          "main_hand_item_use_duration",
          "main_hand_item_max_duration",
          "is_alive",
        ])
      );
    });

    it("using obj", () => {
      const receiver: string[] = [];

      Types.Queries.getUsing(VanillaPlayer.DataOBject, receiver);

      expect(receiver).toEqual(
        expect.arrayContaining([
          "modified_distance_moved",
          "life_time",
          "main_hand_item_use_duration",
          "main_hand_item_max_duration",
          "is_alive",
        ])
      );
    });
  });
});
