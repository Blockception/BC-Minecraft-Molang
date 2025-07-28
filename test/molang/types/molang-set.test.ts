import { MolangFullSet, MolangSet } from "../../../src/molang";
import { VanillaPlayer } from "../../vanilla-player";

describe("Molang", () => {
  describe("MolangFullSet", () => {
    const data1 = MolangFullSet.harvest(VanillaPlayer.Data);
    const data2 = MolangFullSet.harvest(VanillaPlayer.DataOBject);
    expect([data1, data2]).toMatchSnapshot();
  });

  describe("MolangSet", () => {
    const data1 = MolangSet.harvest(VanillaPlayer.Data);
    const data2 = MolangSet.harvest(VanillaPlayer.DataOBject);
    expect([data1, data2]).toMatchSnapshot();
  });

  it("MolangFullSet2", () => {
    const data = MolangFullSet.harvest(VanillaPlayer.Data);
    expect(data).toMatchSnapshot();
  });

  it("MolangFullSet", () => {
    const data = MolangSet.harvest(VanillaPlayer.Data);
    expect(data).toMatchSnapshot();
  });
});
