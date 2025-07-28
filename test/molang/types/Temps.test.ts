import { Types } from '../../../src/molang';
import { VanillaPlayer } from "../../vanilla-player";

describe("Molang", () => {
  describe("temps", () => {
    it("defined1", () => {
      const receiver: string[] = [];

      Types.Temps.getDefined("temp.foo1 = 0; temp.foo2 = 0; t.foo3 = 0;", receiver);

      expect(receiver).toEqual(expect.arrayContaining(["foo1", "foo2", "foo3"]));
    });

    it("defined2", () => {
      const receiver: string[] = [];

      Types.Temps.getDefined(VanillaPlayer.DataOBject, receiver);

      expect(receiver).toEqual(expect.arrayContaining([]));
    });

    it("defined3", () => {
      const receiver: string[] = [];

      Types.Temps.getDefined(VanillaPlayer.Data, receiver);

      expect(receiver).toEqual(expect.arrayContaining(VanillaPlayer.Temps.defined));
    });

    it("duplicate check", () => {
      const receiver: string[] = [];

      Types.Temps.getDefined(["temp.foo1 = 0; temp.foo2 = 0; t.foo3 = 0;", "temp.foo3 = 0;"], receiver);

      expect(receiver).toEqual(expect.arrayContaining(["foo1", "foo2", "foo3"]));
    });

    it("defined not sticky?", () => {
      expect(Types.Temps.getDefinedPattern.sticky).toBeFalsy();
    });

    it("using1", () => {
      const receiver: string[] = [];

      Types.Temps.getUsing(VanillaPlayer.Data, receiver);

      expect(receiver).toEqual(expect.arrayContaining(VanillaPlayer.Temps.using));
    });

    it("using2", () => {
      const receiver: string[] = [];

      Types.Temps.getUsing(VanillaPlayer.DataOBject, receiver);

      expect(receiver).toEqual(expect.arrayContaining(VanillaPlayer.Temps.using));
    });
  });
});
