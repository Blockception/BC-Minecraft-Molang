import { expect } from "chai";
import { getEvent, IsMolangType, MolangType } from "../../src/Molang/Functions";

describe("Functions", () => {
  describe("IsMolangType", () => {
    const shouldbe = [
      "variable.is_holding_right = 0.0;",
      "variable.is_blinking = 0.0;",
      "variable.last_blink_time = 0.0;",
      "variable.hand_bob = 0.0;",
      "variable.first_person_rotation_factor = math.sin((1 - variable.attack_time) * 180.0);",
      "variable.tcos1 = -variable.tcos0;",
      "@s to:anger",
      "@s to:Angrey_wolf",
      "query.variant == 1",
    ];

    shouldbe.forEach((item) =>
      it(`Should return type: ${item}`, () => {
        expect(IsMolangType(item)).to.not.equal(MolangType.unknown);
      })
    );
  });

  it("getEvent", () => {
    const data = getEvent("@s to:anger");

    expect(data).to.equal("to:anger");
  });
});
