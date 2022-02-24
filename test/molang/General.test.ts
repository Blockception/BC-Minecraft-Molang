import { expect } from "chai";
import { General } from "../../src/MolangData/General";

describe("General", () => {
  describe("getQueries", () => {
    const queries = ["unhappy_counter", "time_of_day", "swelling_dir"];

    queries.forEach((item) =>
      it(item, () => {
        expect(General.getQuery(item)).to.not.be.undefined;
      })
    );
  });

  describe("getMath", () => {
    const math = ["abs", "cos", "sin"];

    math.forEach((item) =>
      it(item, () => {
        expect(General.getMath(item)).to.not.be.undefined;
      })
    );
  });
});
