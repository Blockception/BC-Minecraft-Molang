import { Types } from "../../../src/Molang";
import { VanillaPlayer } from "../../vanilla-player";

describe("Molang", () => {
  describe("math", () => {
    it("using", () => {
      const receiver: string[] = [];
      Types.Math.getUsing(VanillaPlayer.Data, receiver);
      expect(receiver).toMatchSnapshot();
    });

    it("using obj", () => {
      const receiver: string[] = [];
      Types.Math.getUsing(VanillaPlayer.DataOBject, receiver);
      expect(receiver).toMatchSnapshot();
    });
  });
});
