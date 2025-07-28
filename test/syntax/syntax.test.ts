import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { parse } from "../../src/molang/syntax/parser/parsing";

const syntaxes = [
  // Transitions checks
  "variable.agent.anim_state == 2",
  "variable.agent.anim_state > 2",
  "variable.agent.anim_state < 2",
  "variable.agent.anim_state != 2",
  "variable.agent.anim_state >= 2",
  "variable.agent.anim_state <= 2",
  "!variable.swaying && query.all_animations_finished",

  // Animation calculations
  "1.5 - math.pow(1.5, 1.0 - 015.0 * query.modified_move_speed) * query.camera_rotation(0)",
  "math.clamp(math.sqrt(math.pow(query.position_delta(0), 2.0) + math.pow(query.position_delta(2), 2.0)), 0.0, 0.1)",
  "-175 * math.sin(variable.attack_time * 180)",

  // Render controller
  "variable.is_enchanted ? Material.enchanted : Material.default",
  "variable.has_trim ? variable.trim_path : Texture.default",
  "!variable.has_trim",
  "array.skins[query.property('minecraft:has_nectar') + query.is_angry * 2]",

  // Entities
  "variable.x_head_rotation = math.clamp(query.target_x_rotation, -32.5, 32.5);",
  "variable.y_head_rotation = math.clamp(query.target_y_rotation, -22.5, 25);",
  "variable.is_rolled_up = query.property('minecraft:armadillo_state') != 'unrolled';",
  "variable.rolled_up_time = variable.is_rolled_up ? ((variable.rolled_up_time ?? 0.0) + query.delta_time) : 0.0;",
  "variable.is_peeking = query.property('minecraft:armadillo_state') == 'rolled_up_peeking';",
  "variable.is_unrolling = query.property('minecraft:armadillo_state') == 'rolled_up_unrolling';",
  "variable.unrolling_time = variable.is_unrolling ? ((variable.unrolling_time ?? 0.0) + query.delta_time) : 0.0;",
  "variable.use_rolled_up_model = variable.rolled_up_time >= 0.2083 && (variable.unrolling_time == 0.0 || variable.unrolling_time <= 1.25 );",
  "variable.walking = query.modified_move_speed > 0.01 && !variable.is_rolled_up;",
  "variable.walk_anim_time_update = query.anim_time + math.min(3.0, math.lerp(2.0, 5.0, query.modified_move_speed)) * query.delta_time;",
];

describe("molang - syntax", () => {
  describe("should be able to parse and match the syntax tree generated", () => {
    test.each(syntaxes)('%#. %s', (s) => {
      const n = parse(OffsetWord.create(s, 0));
      expect(n).toMatchSnapshot();

      // Manual validation
      // Nothing should be left with with space
      n.forEach(item => {
        expect(item.text).toEqual(item.text.trim().length);
      })
    });
  });
});
