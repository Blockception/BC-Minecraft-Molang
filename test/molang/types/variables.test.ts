import { Types } from "../../../src/molang";
import { VanillaPlayer } from "../../vanilla-player";

describe("Molang", () => {
  describe("variables", () => {
    it("defined1", () => {
      const receiver: string[] = [];

      Types.Variables.getDefined("variable.foo1 = 0; variable.foo2 = 0; v.foo3 = 0;", receiver);
      expect(receiver).toMatchSnapshot();
    });

    it("defined2", () => {
      const receiver: string[] = [];

      Types.Variables.getDefined(VanillaPlayer.DataOBject, receiver);
      expect(receiver).toMatchSnapshot();
    });

    it("defined3", () => {
      const receiver: string[] = [];

      Types.Variables.getDefined(VanillaPlayer.Data, receiver);
      expect(receiver).toMatchSnapshot();
    });

    it("defined special", () => {
      const data = `"initialize": [
        "variable.armor_stand.pose_index = 0;",
        "variable.armor_stand.hurt_time = 0;"
      ]`;

      const receiver: string[] = [];
      Types.Variables.getDefined(data, receiver);
      expect(receiver).toMatchSnapshot();
    });

    it("duplicate check", () => {
      const receiver: string[] = [];

      Types.Variables.getDefined(["variable.foo1 = 0; variable.foo2 = 0; v.foo3 = 0;", "variable.foo3 = 0;"], receiver);
      expect(receiver).toMatchSnapshot();
    });

    it("defined not sticky?", () => {
      expect(Types.Variables.getDefinedPatt.sticky).toBeFalsy();
    });

    it("using1", () => {
      const receiver: string[] = [];
      Types.Variables.getUsing(VanillaPlayer.Data, receiver);
      expect(receiver).toMatchSnapshot();
    });

    it("using2", () => {
      const receiver: string[] = [];
      Types.Variables.getUsing(VanillaPlayer.DataOBject, receiver);
      expect(receiver).toMatchSnapshot();
    });

    it("using3", () => {
      const receiver: string[] = [];
      const data = `{
        "default": "variable.armor_stand.pose_index == 0",
        "none": "variable.armor_stand.pose_index == 1"
      }`;

      Types.Variables.getUsing(data, receiver);
      expect(receiver).toMatchSnapshot();
    });
  });
});
