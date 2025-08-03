import { Types } from "../../../src/molang";
import { VanillaPlayer } from "../../vanilla-player";

describe("Molang", () => {
  describe("Contexts", () => {
    it("Using", () => {
      const receiver: string[] = [];
      Types.Context.getUsing(VanillaPlayer.Data, receiver);
      expect(receiver).toMatchSnapshot();
    });

    it("Using obj", () => {
      const receiver: string[] = [];
      Types.Context.getUsing(VanillaPlayer.DataOBject, receiver);
      expect(receiver).toMatchSnapshot();
    });
  });
});
