import { expect } from 'chai'
import { MolangData } from '../../src/main';

describe("Data sanity check", () => {
	it("Animations is defined", () => expect(MolangData.Animations).to.not.be.undefined);
	it("AnimationsControllers is defined", () => expect(MolangData.AnimationsControllers).to.not.be.undefined);
	it("Blocks is defined", () => expect(MolangData.Blocks).to.not.be.undefined);
	it("Entities is defined", () => expect(MolangData.Entities).to.not.be.undefined);
	it("FeaturesRules is defined", () => expect(MolangData.FeaturesRules).to.not.be.undefined);
	it("General is defined", () => expect(MolangData.General).to.not.be.undefined);
	it("Items is defined", () => expect(MolangData.Items).to.not.be.undefined);
	it("Particle is defined", () => expect(MolangData.Particles).to.not.be.undefined);
	it("RenderControllers is defined", () => expect(MolangData.RenderControllers).to.not.be.undefined);
})