import { MolangType, Traverse } from "../../src/Molang";
import { VanillaPlayer } from '../vanilla-player';

describe("Traverse", () => {
  it("rp", () => {
    const obj = VanillaPlayer.DataOBject;
    let count = 0;

    Traverse(obj, () => {
      count++;
    });

    expect(count).toBeGreaterThan(20);
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

    Traverse(obj, (value, type,) => {
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

    expect(commands).toEqual(2);
    expect(events).toEqual(1);
    expect(molang).toEqual(1);
  });
});
