import { expect } from "chai";
import { Types } from '../../../src/Molang/';
import { VanillaPlayer } from "../../Player.test";

describe("Molang", () => {
  describe("temps", () => {
    it("defined1", () => {
      let receiver: string[] = [];

      Types.Temps.getDefined("temp.foo1 = 0; temp.foo2 = 0; t.foo3 = 0;", receiver);

      expect(receiver).to.have.members(["foo1", "foo2", "foo3"]);
    });

    it("defined2", () => {
      let receiver: string[] = [];

      Types.Temps.getDefined(VanillaPlayer.DataOBject, receiver);

      expect(receiver).to.contain.members([]);
    });

    it("defined3", () => {
      let receiver: string[] = [];

      Types.Temps.getDefined(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(VanillaPlayer.Temps.defined);
    });

    it("duplicate check", () => {
      let receiver: string[] = [];

      Types.Temps.getDefined(["temp.foo1 = 0; temp.foo2 = 0; t.foo3 = 0;", "temp.foo3 = 0;"], receiver);

      expect(receiver).to.have.members(["foo1", "foo2", "foo3"]);
    });

    it("defined not sticky?", () => {
      expect(Types.Temps.getDefinedPatt.sticky).to.equal(false);
    });

    it("using1", () => {
      let receiver: string[] = [];

      Types.Temps.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).to.contain.members(VanillaPlayer.Temps.using);
    });

    it("using2", () => {
      let receiver: string[] = [];

      Types.Temps.getUsing(VanillaPlayer.DataOBject, receiver);

      expect(receiver).to.contain.members(VanillaPlayer.Temps.using);
    });
  });
});
