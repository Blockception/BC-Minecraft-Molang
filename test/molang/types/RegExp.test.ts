import { VanillaPlayer } from "../../Player.test";
import { expect } from "chai";
import { RegularExpression } from "../../../src/Molang/RegExp";

describe("Regular expression", () => {
  const pattern = /(?:geometry)\.([a-z0-9_\.]+)/gim;

  describe("Harvest", () => {
    it("String", () => {
      let out: string[] = [];
      RegularExpression.harvestString("geometry.default", pattern, out);

      expect(out).to.have.members(["default"]);
    });

    it("Array", () => {
      let out: string[] = [];
      RegularExpression.harvestArray(["geometry.default", "geometry.example"], pattern, out);

      expect(out).to.have.members(["default", "example"]);
    });

    it("Object", () => {
      let out: string[] = [];
      RegularExpression.harvestObject({ id: "geometry.default", example: { test: "geometry.example" } }, pattern, out);

      expect(out).to.have.members(["default", "example"]);
    });

    it("Object Player", () => {
      let out: string[] = [];
      RegularExpression.harvestObject(VanillaPlayer.DataOBject, pattern, out);

      expect(out).to.have.members(["humanoid.custom", "cape"]);
    });
  });
});
