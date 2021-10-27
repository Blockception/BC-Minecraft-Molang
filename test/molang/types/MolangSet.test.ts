import { expect } from "chai";
import { MolangFullSet, MolangSet } from "../../../src/Molang/include";
import { DefinedUsing, Using } from "../../../src/Types/Defined Using/include";
import { VanillaPlayer } from "../../Player.test";

describe("molang", () => {
  it("MolangFullSet", () => {
    const data1 = MolangFullSet.harvest(VanillaPlayer.Data);
    const data2 = MolangFullSet.harvest(VanillaPlayer.DataOBject);

    testDefinedUsing(data1.geometries, data2.geometries, "geoemtries");
    testDefinedUsing(data1.materials, data2.materials, "materials");
    testDefinedUsing(data1.textures, data2.textures, "textures");
    testUsing(data1.queries, data2.queries, "queries");
    testUsing(data1.contexts, data2.contexts, "contexts");
    testDefinedUsing(data1.variables, data2.variables, "variables");
    testDefinedUsing(data1.temps, data2.temps, "temps");
  });

  it("MolangFullSet2", () => {
    const data = MolangFullSet.harvest(VanillaPlayer.Data);

    expect(data.variables.using).to.contain.members(VanillaPlayer.Variables.using, "using");
    expect(data.variables.defined).to.contain.members(VanillaPlayer.Variables.defined, "defined");
  });

  it("MolangFullSet", () => {
    const data = MolangSet.harvest(VanillaPlayer.Data);

    expect(data.variables.using).to.contain.members(VanillaPlayer.Variables.using, "using");
    expect(data.variables.defined).to.contain.members(VanillaPlayer.Variables.defined, "defined");
  });

  it("MolangSet", () => {
    const data1 = MolangSet.harvest(VanillaPlayer.Data);
    const data2 = MolangSet.harvest(VanillaPlayer.DataOBject);

    testUsing(data1.queries, data2.queries, "queries");
    testDefinedUsing(data1.variables, data2.variables, "variables");
  });
});

function testDefinedUsing(data1: DefinedUsing<string>, data2: DefinedUsing<string>, id: string) {
  expect(data1.defined, "from string").to.contain.members(data2.defined, "defined " + id);
  expect(data1.using, "from string").to.contain.members(data2.using, "using " + id);
}

function testUsing(data1: Using<string>, data2: Using<string>, id: string) {
  expect(data1.using, "from string").to.contain.members(data2.using, id);
}
