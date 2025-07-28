import { Types } from "../../../src/molang";
import { VanillaPlayer } from "../../vanilla-player";

describe("Molang", () => {
  describe("geometries", () => {
    it("using", () => {
      const receiver: string[] = [];
      Types.Geometries.getUsing(VanillaPlayer.Data, receiver);
      expect(receiver).toMatchSnapshot();
    });

    it("using obj", () => {
      const receiver: string[] = [];
      Types.Geometries.getUsing(VanillaPlayer.DataOBject, receiver);
      expect(receiver).toMatchSnapshot();
    });
  });
});
