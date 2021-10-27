import { expect } from "chai";
import { Types } from '../../../src/Molang/include';
import { VanillaPlayer } from "../../Player.test";

describe("molang", () => {
  describe("variables", () => {
    it("defined1", () => {
      let receiver: string[] = [];

      Types.Variables.getDefined("variable.foo1 = 0; variable.foo2 = 0; v.foo3 = 0;", receiver);

      expect(receiver).to.have.members(["foo1", "foo2", "foo3"]);
    });

    it("defined2", () => {
      let receiver: string[] = [];

      Types.Variables.getDefined(VanillaPlayer.DataOBject, receiver);

      expect(receiver).to.contain.members(VanillaPlayer.Variables.defined);
    });

    it("defined3", () => {
      let receiver: string[] = [];

      Types.Variables.getDefined(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(VanillaPlayer.Variables.defined);
    });

    it("defined special",()=>{
      const data = `"initialize": [
        "variable.armor_stand.pose_index = 0;",
        "variable.armor_stand.hurt_time = 0;"
      ]`;

      let receiver : string[] = [];
      Types.Variables.getDefined(data, receiver);

      expect(receiver).to.contains.members(["armor_stand.pose_index", "armor_stand.hurt_time"])
    })

    it("duplicate check", () => {
      let receiver: string[] = [];

      Types.Variables.getDefined(["variable.foo1 = 0; variable.foo2 = 0; v.foo3 = 0;", "variable.foo3 = 0;"], receiver);

      expect(receiver).to.have.members(["foo1", "foo2", "foo3"]);
    });

    it("defined not sticky?", () => {
      expect(Types.Variables.getDefinedPatt.sticky).to.equal(false);
    });

    it("using1", () => {
      let receiver: string[] = [];

      Types.Variables.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(VanillaPlayer.Variables.using);
    });

    it("using2", () => {
      let receiver: string[] = [];

      Types.Variables.getUsing(VanillaPlayer.DataOBject, receiver);

      expect(receiver).to.contain.members(VanillaPlayer.Variables.using);
    });
  });
});
