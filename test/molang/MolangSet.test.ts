import { expect } from "chai";
import { MolangFullSet, MolangSet } from "../../src/Lib/Molang/MolangSet";
import { DefinedUsing, Using } from "../../src/Lib/Types/Defined Using/include";
import { VanillaPlayer } from "../Player.test";

describe("molang", () => {
  it("MolangFullSet", () => {
    const data1 = MolangFullSet.harvest(VanillaPlayer.Data);
    const data2 = MolangFullSet.harvest(VanillaPlayer.DataOBject);

    testDefinedUsing(data1.geometries, data2.geometries, "geoemtries");
    testDefinedUsing(data1.materials, data2.materials, "materials");
    testDefinedUsing(data1.textures, data2.textures, "textures");
    testUsing(data1.queries, data2.queries, "queries");
    testDefinedUsing(data1.variables, data2.variables, "variables");
  });

  it("MolangFullSet", () => {
    const data = MolangFullSet.harvest(VanillaPlayer.Data);

    expect(data.variables.using).to.contain.members(VanillaPlayer.Variables.using);
    expect(data.variables.defined).to.contain.members(VanillaPlayer.Variables.defined);
  });

  it("MolangSet", () => {
    const data1 = MolangSet.harvest(VanillaPlayer.Data);
    const data2 = MolangSet.harvest(VanillaPlayer.DataOBject);

    testUsing(data1.queries, data2.queries, "queries");
    testDefinedUsing(data1.variables, data2.variables, "variables");
  });
});

function testDefinedUsing(data1: DefinedUsing<string>, data2: DefinedUsing<string>, id: string) {
  expect(data1.defined, "from string").to.have.members(data2.defined, "defined " + id);
  expect(data1.using, "from string").to.have.members(data2.using, "using " + id);
}

function testUsing(data1: Using<string>, data2: Using<string>, id: string) {
  expect(data1.using, "from string").to.have.members(data2.using, id);
}
