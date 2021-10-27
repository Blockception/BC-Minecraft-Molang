import { expect } from "chai";
import { IsMolangType, MolangType } from "../../src/Molang/Functions";

describe("Molang", () => {
  describe("IsMolang", () => {
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
      it(item, () => {
        expect(IsMolangType(item)).to.not.equal(MolangType.unknown);
      })
    );
  });
});
