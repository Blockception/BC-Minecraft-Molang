import { RegularExpression } from "../../../src/molang";
import { VanillaPlayer } from "../../vanilla-player";

describe("Regular expression", () => {
  const pattern = /(?:geometry)\.([a-z0-9_.]+)/gim;

  describe("Harvest", () => {
    it("String", () => {
      const out: string[] = [];
      RegularExpression.harvestString("geometry.default", pattern, out);

      expect(out).toEqual(expect.arrayContaining(["default"]));
    });

    it("Array", () => {
      const out: string[] = [];
      RegularExpression.harvestArray(["geometry.default", "geometry.example"], pattern, out);

      expect(out).toEqual(expect.arrayContaining(["default", "example"]));
    });

    it("Object", () => {
      const out: string[] = [];
      RegularExpression.harvestObject({ id: "geometry.default", example: { test: "geometry.example" } }, pattern, out);

      expect(out).toEqual(expect.arrayContaining(["default", "example"]));
    });

    it("Object Player", () => {
      const out: string[] = [];
      RegularExpression.harvestObject(VanillaPlayer.DataOBject, pattern, out);

      expect(out).toEqual(expect.arrayContaining(["humanoid.custom", "cape"]));
    });
  });
});
