import { expect } from 'chai'
import { MolangData } from '../../src/main';

describe("data sanity check", () => {
	it("Animations", () => expect(MolangData.Animations).to.not.be.undefined);
	it("AnimationsControllers", () => expect(MolangData.AnimationsControllers).to.not.be.undefined);
	it("Blocks", () => expect(MolangData.Blocks).to.not.be.undefined);
	it("Entities", () => expect(MolangData.Entities).to.not.be.undefined);
	it("FeaturesRules", () => expect(MolangData.FeaturesRules).to.not.be.undefined);
	it("General", () => expect(MolangData.General).to.not.be.undefined);
	it("Items", () => expect(MolangData.Items).to.not.be.undefined);
	it("Particle", () => expect(MolangData.Particles).to.not.be.undefined);
	it("RenderControllers", () => expect(MolangData.RenderControllers).to.not.be.undefined);
})