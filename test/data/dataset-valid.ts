export const valid_syntaxes = [
  // Transitions checks
  "!v.swaying && q.all_animations_finished",
  "!variable.swaying && query.all_animations_finished",
  "temp.foo1 = 0; temp.foo2 = 0; t.foo3 = 0;",
  "temp.foo1 = 0; temp.foo2 = 0; t.foo3 = 0;", "temp.foo3 = 0;",
  "v.agent.anim_state != 2",
  "v.agent.anim_state < 2",
  "v.agent.anim_state <= 2",
  "v.agent.anim_state == 2",
  "v.agent.anim_state > 2",
  "v.agent.anim_state >= 2",
  "variable.agent.anim_state != 2",
  "variable.agent.anim_state < 2",
  "variable.agent.anim_state <= 2",
  "variable.agent.anim_state == 2",
  "variable.agent.anim_state > 2",
  "variable.agent.anim_state >= 2",
  "variable.armor_stand.hurt_time = 0;",
  "variable.armor_stand.pose_index = 0;",
  "variable.foo1 = 0; variable.foo2 = 0; v.foo3 = 0;",
  "variable.foo1 = 0; variable.foo2 = 0; v.foo3 = 0;",
  "variable.foo3 = 0;",

  // Animation calculations
  "-175 * math.sin(variable.attack_time * 180)",
  "-5.0 * Math.cos(297.9380535 * query.anim_time) - 5.0",
  "1.5 - math.pow(1.5, 1.0 - 015.0 * query.modified_move_speed) * query.camera_rotation(0)",
  "math.clamp(math.sqrt(math.pow(query.position_delta(0), 2.0) + math.pow(query.position_delta(2), 2.0)), 0.0, 0.1)",
  "math.sin(variable.attack_time * 180) * -175",

  // Render controller
  "!variable.has_trim",
  "array.skins[query.property('minecraft:has_nectar') + query.is_angry * 2]",
  "variable.has_trim ? variable.trim_path : Texture.default",
  "variable.is_enchanted ? Material.enchanted : Material.default",

  // Entities
  "variable.is_peeking = query.property('minecraft:armadillo_state') == 'rolled_up_peeking';",
  "variable.is_rolled_up = (variable.unrolling_time == 0.0 || variable.unrolling_time <= 1.25 );",
  "variable.is_rolled_up = (variable.unrolling_time == 0.0 || variable.unrolling_time <= 1.25 || variable.unrolling_time >= 5 );",
  "variable.is_rolled_up = query.property('minecraft:armadillo_state') != 'unrolled';",
  "variable.is_unrolling = query.property('minecraft:armadillo_state') == 'rolled_up_unrolling';",
  "variable.rolled_up_time = variable.is_rolled_up ? ((variable.rolled_up_time ?? 0.0) + query.delta_time) : 0.0;",
  "variable.unrolling_time = variable.is_unrolling ? ((variable.unrolling_time ?? 0.0) + query.delta_time) : 0.0;",
  "variable.use_rolled_up_model = variable.rolled_up_time >= 0.2083 && (variable.unrolling_time == 0.0 || variable.unrolling_time <= 1.25 );",
  "variable.walk_anim_time_update = query.anim_time + math.min(3.0, math.lerp(2.0, 5.0, query.modified_move_speed)) * query.delta_time;",
  "variable.walk_anim_time_update = query.anim_time + math.min(3.0, math.lerp(2.0, 5.0, query.modified_move_speed)) * query.delta_time;variable.y_head_rotation = math.clamp(query.target_y_rotation, -22.5, 25);",
  "variable.walking = query.modified_move_speed > 0.01 && !variable.is_rolled_up;",
  "variable.x_head_rotation = math.clamp(query.target_x_rotation, -32.5, 32.5);",
  "variable.x_head_rotation = math.clamp(query.target_x_rotation, -32.5, 32.5);",
  "variable.x_head_rotation = query.target_x_rotation * 32.5;",
  "variable.y_head_rotation = math.clamp(query.target_y_rotation, -22.5, 25);",
  "variable.y_head_rotation = math.clamp(query.target_y_rotation, -22.5, 25);",

  "variable.is_peeking = q.property('minecraft:armadillo_state') == 'rolled_up_peeking';",
  "variable.is_rolled_up = q.property('minecraft:armadillo_state') != 'unrolled';",
  "variable.is_unrolling = q.property('minecraft:armadillo_state') == 'rolled_up_unrolling';",
  "variable.rolled_up_time = variable.is_rolled_up ? ((variable.rolled_up_time ?? 0.0) + q.delta_time) : 0.0;",
  "variable.unrolling_time = variable.is_unrolling ? ((variable.unrolling_time ?? 0.0) + q.delta_time) : 0.0;",
  "variable.walk_anim_time_update = q.anim_time + math.min(3.0, math.lerp(2.0, 5.0, q.modified_move_speed)) * q.delta_time;",
  "variable.walk_anim_time_update = q.anim_time + math.min(3.0, math.lerp(2.0, 5.0, q.modified_move_speed)) * q.delta_time;variable.y_head_rotation = math.clamp(q.target_y_rotation, -22.5, 25);",
  "variable.walking = q.modified_move_speed > 0.01 && !variable.is_rolled_up;",

  // conditional tests
  "variable.state = variable.is_rolled_up ? 1 : 0;",
  "variable.state = variable.is_rolled_up ? 2 * (5 + variable.state) : 3 * 1 + variable.foo;",
  "variable.state = variable.is_rolled_up ? variable.rolled_up_time >= 0.2083 ? 1 : 2 : 3;",

  // Test
  "v.temp_outfit!=q.property('foo:bar')+q.property('foo:bar')+q.property('foo:bar')",
];