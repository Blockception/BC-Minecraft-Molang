import { VanillaPlayer } from "../Player.test";
import { expect } from "chai";
import { RegularExpression } from "../../src/Lib/Molang/RegExp";

describe("Regularexpression", () => {
  const pattern = /(?:geometry)\.([a-z0-9_\.]+)/gim;

  it("harvestString", () => {
    let out: string[] = [];
    RegularExpression.harvestString("geometry.default", pattern, out);

    expect(out).to.have.members(["default"]);
  });

  it("harvestArray", () => {
    let out: string[] = [];
    RegularExpression.harvestArray(["geometry.default", "geometry.example"], pattern, out);

    expect(out).to.have.members(["default", "example"]);
  });

  it("harvestObject", () => {
    let out: string[] = [];
    RegularExpression.harvestObject({ id: "geometry.default", example: { test: "geometry.example" } }, pattern, out);

    expect(out).to.have.members(["default", "example"]);
  });

  it("harvestObject Player", () => {
    let out: string[] = [];
    RegularExpression.harvestObject(VanillaPlayer.DataOBject, pattern, out);

    expect(out).to.have.members(["humanoid.custom", "cape"]);
  });
});
