import { expect } from "chai";
import { MolangType } from "../../src/Molang/Functions";
import { Traverse } from "../../src/Molang/Traverese";
import { VanillaPlayer } from "../Player.test";

describe("Traverse", () => {
  it("rp", () => {
    const obj = VanillaPlayer.DataOBject;
    let count = 0;

    Traverse(obj, (molang, type, path) => {
      count++;
    });

    expect(count).to.be.greaterThan(20);
  });

  it("anim", () => {
    const obj = {
      "animation.billy_robot.temp_deactivate": {
        animation_length: 4.5,
        loop: false,
        timeline: {
          "0.0": ["/effect @s instant_health 1 3 true", "/tag @s remove vulnerable"],
          "4.0": ["@s self:activate", "variable.temp=query.variant;"],
        },
      },
    };

    let commands = 0;
    let events = 0;
    let molang = 0;

    Traverse(obj, (value, type, path) => {
      switch (type) {
        case MolangType.command:
          commands++;
          break;

        case MolangType.event:
          events++;
          break;

        case MolangType.molang:
          molang++;
          break;
      }
    });

    expect(commands).to.equal(2);
    expect(events).to.equal(1);
    expect(molang).to.equal(1);
  });
});
