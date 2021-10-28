import { MolangFunction } from "./MolangData";

/**General molang data*/
export namespace General {
  /**The collection of math functions*/
  export const Math: MolangFunction[] = [
    {
      documentation: "Absolute value of value",
      id: "abs",
      parameters: [{ id: "value" }],
    },
    {
      documentation: "arccos of value",
      id: "acos",
      parameters: [{ id: "value" }],
    },
    {
      documentation: "arcsin of value",
      id: "asin",
      parameters: [{ id: "value" }],
    },
    {
      documentation: "arctan of value",
      id: "atan",
      parameters: [{ id: "value" }],
    },
    {
      documentation: "arctan of y/x. NOTE: the order of arguments!",
      id: "atan2",
      parameters: [{ id: "y" }, { id: "x" }],
    },
    {
      documentation: "Round value up to nearest integral number",
      id: "ceil",
      parameters: [{ id: "value" }],
    },
    {
      documentation: "Clamp value to between min and max inclusive",
      id: "clamp",
      parameters: [{ id: "value" }, { id: "min" }, { id: "max" }],
    },
    {
      documentation: "Cosine (in degrees) of value",
      id: "cos",
      parameters: [{ id: "value" }],
    },
    {
      documentation:
        "returns the sum of 'num' random numbers, each with a value from low to high`. Note: the generated random numbers are not integers like normal dice. For that, use die_roll_integer`.",
      id: "die_roll",
      parameters: [{ id: "num" }, { id: "low" }, { id: "high" }],
    },
    {
      documentation:
        "returns the sum of 'num' random integer numbers, each with a value from low to high`. Note: the generated random numbers are integers like normal dice.",
      id: "die_roll_integer",
      parameters: [{ id: "num" }, { id: "low" }, { id: "high" }],
    },
    {
      documentation: "Calculates e to the value'th power",
      id: "exp",
      parameters: [{ id: "value" }],
    },
    {
      documentation: "Round value down to nearest integral number",
      id: "floor",
      parameters: [{ id: "value" }],
    },
    {
      documentation:
        "Useful for simple smooth curve interpolation using one of the Hermite Basis ids: `3t^2 - 2t^3`. Note that while any valid float is a valid input, this id works best in the range [0,1].",
      id: "hermite_blend",
      parameters: [{ id: "value" }],
    },
    {
      documentation: "Lerp from start to end via 0_to_1",
      id: "lerp",
      parameters: [{ id: "start" }, { id: "end" }, { id: "0_to_1" }],
    },
    {
      documentation: "Lerp the shortest direction around a circle from start degrees to end degrees via 0_to_1",
      id: "lerprotate",
      parameters: [{ id: "start" }, { id: "end" }, { id: "0_to_1" }],
    },
    {
      documentation: "Natural logarithm of value",
      id: "ln",
      parameters: [{ id: "value" }],
    },
    {
      documentation: "Return highest value of A or B",
      id: "max",
      parameters: [{ id: "A" }, { id: "B" }],
    },
    {
      documentation: "Return lowest value of A or B",
      id: "min",
      parameters: [{ id: "A" }, { id: "B" }],
    },
    {
      documentation: "Minimize angle magnitude (in degrees) into the range [-180, 180]",
      id: "min_angle",
      parameters: [{ id: "value" }],
    },
    {
      documentation: "Return the remainder of value / denominator",
      id: "mod",
      parameters: [{ id: "value" }, { id: "denominator" }],
    },
    {
      documentation: "Returns the float representation of the constant pi.",
      id: "pi",
    },
    {
      documentation: "Elevates `base` to the `exponent`'th power",
      id: "pow",
      parameters: [{ id: "base" }, { id: "exponent" }],
    },
    {
      documentation: "Random value between low and high inclusive",
      id: "random",
      parameters: [{ id: "low" }, { id: "high" }],
    },
    {
      documentation: "Random integer value between low and high inclusive",
      id: "random_integer",
      parameters: [{ id: "low" }, { id: "high" }],
    },
    {
      documentation: "Round value to nearest integral number",
      id: "round",
      parameters: [{ id: "value" }],
    },
    {
      documentation: "Sine (in degrees) of value",
      id: "sin",
      parameters: [{ id: "value" }],
    },
    {
      documentation: "Square root of value",
      id: "sqrt",
      parameters: [{ id: "value" }],
    },
    {
      documentation: "Round value towards zero",
      id: "trunc",
      parameters: [{ id: "value" }],
    },
  ];
  /**The collection of queries*/
  export const Queries: MolangFunction[] = [
    {
      documentation: "Gets specified axis of the specified bone orientation pivot",
      id: "get_default_bone_pivot",
    },
    {
      documentation: "Returns 1.0 if the entity is in contact with any water (water, rain, splash water bottle), else it returns 0.0",
      id: "is_in_contact_with_water",
    },
    {
      documentation: "Returns 1.0 if the entity is playing dead, else it returns 0.0",
      id: "is_playing_dead",
    },
    {
      documentation: "Returns the height of the block immediately above the highest solid block at the input (x,z) position",
      id: "above_top_solid",
    },
    {
      documentation: "Returns the number of actors rendered in the last frame",
      id: "actor_count",
    },
    {
      documentation:
        "Only valid in an animation controller. Returns 1.0 if all animations in the current animation controller state have played through at least once, else it returns 0.0",
      id: "all_animations_finished",
    },
    {
      documentation: "Returns if the item or block has all of the tags specified",
      id: "all_tags",
    },
    {
      documentation: "Returns the time in seconds since the current animation started, else 0.0 if not called within an animation",
      id: "anim_time",
    },
    {
      documentation:
        "Only valid in an animation controller. Returns 1.0 if any animation in the current animation controller state has played through at least once, else it returns 0.0",
      id: "any_animation_finished",
    },
    {
      documentation: "Returns if the item or block has any of the tags specified",
      id: "any_tag",
    },
    {
      documentation: "Returns 1.0 if all of the arguments are within 0.000000 of each other, else 0.0",
      id: "approx_eq",
    },
    {
      documentation: "Takes the armor slot index as a parameter, and returns the color of the armor in the requested slot",
      id: "armor_color_slot",
    },
    {
      documentation: "Takes the armor slot index as a parameter, and returns the armor material type in the requested armor slot",
      id: "armor_material_slot",
    },
    {
      documentation: "Takes the armor slot index as a parameter, and returns the texture type of the requested slot",
      id: "armor_texture_slot",
    },
    {
      documentation:
        "Returns the time in *seconds* of the average frame time over the last 'n' frames. If an argument is passed, it is assumed to be the number of frames in the past that you wish to query. `query.average_frame_time` (or the equivalent `query.average_frame_time(0)`) will return the frame time of the frame before the current one. `query.average_frame_time(1)` will return the average frame time of the previous two frames. Currently we store the history of the last 30 frames, although note that this may change in the future. Asking for more frames will result in only sampling the number of frames stored.",
      id: "average_frame_time",
    },
    {
      documentation:
        "Returns the block face for this (only valid for certain triggers such as placing blocks, or interacting with block) (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).",
      id: "block_face",
    },
    {
      documentation: "Returns the value of the associated Blocks Block State",
      id: "block_property",
    },
    {
      documentation: "Returns 1.0 if the entity is blocking, else it returns 0.0",
      id: "blocking",
    },
    {
      documentation: "Returns the body pitch rotation if called on an actor, else it returns 0.0",
      id: "body_x_rotation",
    },
    {
      documentation: "Returns the body yaw rotation if called on an actor, else it returns 0.0",
      id: "body_y_rotation",
    },
    {
      documentation:
        "Takes two distances (any order) and return a number from 0 to 1 based on the camera distance between the two ranges clamped to that range. For example, `query.camera_distance_range_lerp(10, 20)` will return 0 for any distance less than or equal to 10, 0.2 for a distance of 12, 0.5 for 15, and 1 for 20 or greater. If you pass in (20, 10), a distance of 20 will return 0.0",
      id: "camera_distance_range_lerp",
    },
    {
      documentation: "Returns the rotation of the camera. Requires one argument representing the rotation axis you would like (`0 for x`, `1 for y`)",
      id: "camera_rotation",
    },
    {
      documentation: "Returns 1.0 if the entity can climb, else it returns 0.0",
      id: "can_climb",
    },
    {
      documentation: "Returns 1.0 if the entity can damage nearby mobs, else it returns 0.0",
      id: "can_damage_nearby_mobs",
    },
    {
      documentation: "Returns 1.0 if the entity can fly, else it returns 0.0",
      id: "can_fly",
    },
    {
      documentation: "Returns 1.0 if the entity can power jump, else it returns 0.0",
      id: "can_power_jump",
    },
    {
      documentation: "Returns 1.0 if the entity can swim, else it returns 0.0",
      id: "can_swim",
    },
    {
      documentation: "Returns 1.0 if the entity can walk, else it returns 0.0",
      id: "can_walk",
    },
    {
      documentation:
        "Returns the axis aligned bounding box of a bone as a struct with members '.min', '.max', along with '.x', '.y', and '.z' values for each.",
      id: "bone_aabb",
    },
    {
      documentation: "Returns the initial (from the .geo) pivot of a bone as a struct with members '.x', '.y', and '.z'.",
      id: "bone_origin",
    },
    {
      documentation: "Returns the initial (from the .geo) rotation of a bone as a struct with members '.x', '.y', and '.z' in degrees.",
      id: "bone_rotation",
    },
    {
      documentation: "returns value between 0.0 and 1.0 with 0.0 meaning cape is fully down and 1.0 is cape is fully up",
      id: "cape_flap_amount",
    },
    /*{
      documentation: "DEPRECATED (please use query.block_face instead) Returns the block face for this (only valid for on_placed_by_player trigger) (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).",
      id: "cardinal_block_face_placed_on",
    },*/
    {
      documentation: "Returns the current facing of the player (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).",
      id: "cardinal_facing",
    },
    {
      documentation:
        "Returns the current facing of the player ignoring up/down part of the direction (North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).",
      id: "cardinal_facing_2d",
    },
    {
      documentation: "Returns the current facing of the player (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).",
      id: "cardinal_player_facing",
    },
    {
      documentation:
        "Combines any valid entity references from all arguments into a single array. Note that order is not preserved, and duplicates and invalid values are removed.",
      id: "combine_entities",
    },
    {
      documentation: "Counts the number of things passed to it (arrays are counted as the number of elements they contain; non-arrays count as 1).",
      id: "count",
    },
    {
      documentation: "Returns the squish value for the current entity, or 0.0 if this doesn't make sense",
      id: "current_squish_value",
    },
    {
      documentation: "Returns the day of the current level.",
      id: "day",
    },
    {
      documentation: "debug log a value to the output debug window for builds that have one",
      id: "debug_output",
    },
    {
      documentation: "Returns the elapsed ticks since the mob started dying.",
      id: "death_ticks",
    },
    {
      documentation: "Returns the time in seconds since the previous frame",
      id: "delta_time",
    },
    {
      documentation: "Returns the distance of the root of this actor or particle emitter from the camera",
      id: "distance_from_camera",
    },
    {
      documentation: "Returns the total number of active emitters of the callee's particle effect type",
      id: "effect_emitter_count",
    },
    {
      documentation: "Returns the total number of active particles of the callee's particle effect type",
      id: "effect_particle_count",
    },
    {
      documentation: "returns the equipment count for an actor",
      id: "equipment_count",
    },
    {
      documentation:
        "takes a slot name followed by any tag you want to check for in the form of 'tag_name' and returns 1 if all of the tags are on that equipped item, 0 otherwise",
      id: "equipped_item_all_tags",
    },
    {
      documentation:
        "takes a slot name followed by any tag you want to check for in the form of 'tag_name' and returns 0 if none of the tags are on that equipped item or 1 if at least 1 tag exists",
      id: "equipped_item_any_tag",
    },
    {
      documentation:
        "Takes the desired hand slot as a parameter (0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand), and returns whether the item is an attachable or not.",
      id: "equipped_item_is_attachable",
    },
    {
      documentation: "returns the X eye rotation of the entity if it makes sense, else it returns 0.0",
      id: "eye_target_x_rotation",
    },
    {
      documentation: "returns the Y eye rotation of the entity if it makes sense, else it returns 0.0",
      id: "eye_target_y_rotation",
    },
    {
      documentation: "Returns the ratio (from 0 to 1) of how much between AI ticks this frame is being rendered",
      id: "frame_alpha",
    },
    {
      documentation: "Returns 1.0 if the entity is attacking from range (i.e. minecraft:behavior.ranged_attack), else it returns 0.0",
      id: "facing_target_to_range_attack",
    },
    {
      documentation: "Returns the integer id of an actor by its string name",
      id: "get_actor_info_id",
    },
    {
      documentation: "Returns the current texture of the item",
      id: "get_animation_frame",
    },
    {
      documentation:
        "takes one optional hand slot as a parameter (0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand), and a second parameter (0=default) if you would like the equipped item or any non-zero number for the currently rendered item, and returns the name of the item in the requested slot (defaulting to the main hand if no parameter is supplied) if there is one, otherwise returns ''.",
      id: "get_equipped_item_name",
    },
    {
      documentation: "Gets specified axis of the specified locator offset",
      id: "get_locator_offset",
    },
    {
      documentation: "get the name of the mob if there is one, otherwise return ''",
      id: "get_name",
    },
    {
      documentation: "Gets specified axis of the specified locator offset of the root model",
      id: "get_root_locator_offset",
    },
    {
      documentation: "Returns the ground speed of the entity in metres/second",
      id: "ground_speed",
    },
    {
      documentation: "Returns 1 if the entity has any of the specified families, else 0.",
      id: "has_any_family",
    },
    {
      documentation: "Takes the armor slot index as a parameter, and returns 1.0 if the entity has armor in the requested slot, else it returns 0.0",
      id: "has_armor_slot",
    },
    {
      documentation: "Returns whether or not a Block Placement Target has a specific biome tag",
      id: "has_biome_tag",
    },
    {
      documentation: "Returns 1.0 if the associated block has the given block property or 0.0 if not",
      id: "has_block_property",
    },
    {
      documentation: "Returns 1.0 if the player has a cape, else it returns 0.0",
      id: "has_cape",
    },
    {
      documentation: "Returns 1.0 if the entity has collisions enabled, else it returns 0.0",
      id: "has_collision",
    },
    {
      documentation: "Returns 1.0 if the entity is affected by gravity, else it returns 0.0",
      id: "has_gravity",
    },
    {
      documentation: "Returns true if the entity has an owner ID else it returns false",
      id: "has_owner",
    },
    {
      documentation: "Returns 1.0 if the entity has a rider, else it returns 0.0",
      id: "has_rider",
    },
    {
      documentation: "Returns 1.0 if the entity has a target, else it returns 0.0",
      id: "has_target",
    },
    {
      documentation: "returns the roll angle of the head of the entity if it makes sense, else it returns 0.0",
      id: "head_roll_angle",
    },
    {
      documentation: "Takes one argument as a parameter. Returns the nth head x rotation of the entity if it makes sense, else it returns 0.0",
      id: "head_x_rotation",
    },
    {
      documentation: "Takes one argument as a parameter. Returns the nth head y rotation of the entity if it makes sense, else it returns 0.0",
      id: "head_y_rotation",
    },
    {
      documentation: "Returns the health of the entity, or 0.0 if it doesn't make sense to call on this entity.",
      id: "health",
    },
    {
      documentation: "Queries Height Map",
      id: "heightmap",
    },
    {
      documentation: "returns the hurt direction for the actor, otherwise returns 0",
      id: "hurt_direction",
    },
    {
      documentation: "returns the hurt time for the actor, otherwise returns 0",
      id: "hurt_time",
    },
    {
      documentation: "Returns the number of ticks of invulnerability the entity has left if it makes sense, else it returns 0.0",
      id: "invulnerable_ticks",
    },
    {
      documentation: "Returns 1.0 if the entity is admiring, else it returns 0.0",
      id: "is_admiring",
    },
    {
      documentation: "returns 1.0 if the entity is alive, and 0.0 if it's dead",
      id: "is_alive",
    },
    {
      documentation: "Returns 1.0 if the entity is angry, else it returns 0.0",
      id: "is_angry",
    },
    {
      documentation: "Returns 1.0 if the actor is attached to an entity, else it will return 0.0",
      id: "is_attached_to_entity",
    },
    {
      documentation: "Returns 1.0 if the entity is fleeing from a block, else it returns 0.0",
      id: "is_avoiding_block",
    },
    {
      documentation: "Returns 1.0 if the entity is fleeing from mobs, else it returns 0.0",
      id: "is_avoiding_mobs",
    },
    {
      documentation: "Returns 1.0 if the entity is a baby, else it returns 0.0",
      id: "is_baby",
    },
    {
      documentation: "Returns 1.0 if the entity is breathing, else it returns 0.0",
      id: "is_breathing",
    },
    {
      documentation: "Returns 1.0 if the entity has been bribed, else it returns 0.0",
      id: "is_bribed",
    },
    {
      documentation: "Returns 1.0 if the entity is carrying a block, else it returns 0.0",
      id: "is_carrying_block",
    },
    {
      documentation: "Returns 1.0 if the entity is casting, else it returns 0.0",
      id: "is_casting",
    },
    {
      documentation: "Returns 1.0 if the entity is celebrating, else it returns 0.0",
      id: "is_celebrating",
    },
    {
      documentation: "Returns 1.0 if the entity is doing a special celebration, else it returns 0.0",
      id: "is_celebrating_special",
    },
    {
      documentation: "Returns 1.0 if the entity is charged, else it returns 0.0",
      id: "is_charged",
    },
    {
      documentation: "Returns 1.0 if the entity is charging, else it returns 0.0",
      id: "is_charging",
    },
    {
      documentation: "Returns 1.0 if the entity has chests attached to it, else it returns 0.0",
      id: "is_chested",
    },
    {
      documentation: "Returns 1.0 if the entity is critical, else it returns 0.0",
      id: "is_critical",
    },
    {
      documentation: "Returns 1.0 if the entity is dancing, else it returns 0.0",
      id: "is_dancing",
    },
    {
      documentation: "returns 1.0 if the entity is attacking using the delayed attack, else it returns 0.0",
      id: "is_delayed_attacking",
    },
    {
      documentation: "Returns 1.0 if the entity is eating, else it returns 0.0",
      id: "is_eating",
    },
    {
      documentation: "Returns 1.0 if the entity is an elder version of it, else it returns 0.0",
      id: "is_elder",
    },
    {
      documentation: "Returns 1.0 if the entity is emoting, else it returns 0.0",
      id: "is_emoting",
    },
    {
      documentation: "Returns 1.0 if the entity is enchanted, else it returns 0.0",
      id: "is_enchanted",
    },
    {
      documentation: "Returns 1.0 if the entity is immune to fire, else it returns 0.0",
      id: "is_fire_immune",
    },
    {
      documentation: "Returns 1.0 if the entity is being rendered in first person mode, else it returns 0.0",
      id: "is_first_person",
    },
    {
      documentation: "returns 1.0 if an entity is a ghost, else it returns 0.0",
      id: "is_ghost",
    },
    {
      documentation: "Returns 1.0 if the entity is gliding, else it returns 0.0",
      id: "is_gliding",
    },
    {
      documentation: "Returns 1.0 if the entity is grazing, or 0.0 if not",
      id: "is_grazing",
    },
    {
      documentation: "Returns 1.0 if the entity is idling, else it returns 0.0",
      id: "is_idling",
    },
    {
      documentation: "Returns 1.0 if the entity is ignited, else it returns 0.0",
      id: "is_ignited",
    },
    {
      documentation: "Returns 1.0 if the entity is an illager captain, else it returns 0.0",
      id: "is_illager_captain",
    },
    {
      documentation: "Returns 1.0 if the entity is in love, else it returns 0.0",
      id: "is_in_love",
    },
    {
      documentation: "Returns 1.0 if the entity is rendered as part of the UI, else it returns 0.0",
      id: "is_in_ui",
    },
    {
      documentation: "Returns 1.0 if the entity is in water, else it returns 0.0",
      id: "is_in_water",
    },
    {
      documentation: "Returns 1.0 if the entity is in water or rain, else it returns 0.0",
      id: "is_in_water_or_rain",
    },
    {
      documentation: "Returns 1.0 if the entity is interested, else it returns 0.0",
      id: "is_interested",
    },
    {
      documentation: "Returns 1.0 if the entity is invisible, else it returns 0.0",
      id: "is_invisible",
    },
    {
      documentation:
        "takes one optional hand slot as a parameter (0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand), and returns 1.0 if there is an item in the requested slot (defaulting to the main hand if no parameter is supplied), otherwise returns 0.0.",
      id: "is_item_equipped",
      parameters: [{ id: "slot", documentation: "0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand" }],
    },
    {
      documentation: "Returns 1.0 if the entity is in water or rain, else it returns 0.0",
      id: "is_jumping",
    },
    {
      documentation: "Returns 1.0 if the entity is laying down, else it returns 0.0",
      id: "is_laying_down",
    },
    {
      documentation: "Returns 1.0 if the entity is laying an egg, else it returns 0.0",
      id: "is_laying_egg",
    },
    {
      documentation: "Returns 1.0 if the entity is leashed to something, else it returns 0.0",
      id: "is_leashed",
    },
    {
      documentation: "Returns 1.0 if the entity is levitating, else it returns 0.0",
      id: "is_levitating",
    },
    {
      documentation: "Returns 1.0 if the entity is lingering, else it returns 0.0",
      id: "is_lingering",
    },
    {
      documentation: "Returns 1.0 if the entity is moving, else it returns 0.0",
      id: "is_moving",
    },
    {
      documentation: "returns 1.0 if the entity is on fire, else it returns 0.0",
      id: "is_on_fire",
    },
    {
      documentation: "Returns 1.0 if the entity is on the ground, else it returns 0.0",
      id: "is_on_ground",
    },
    {
      documentation: "returns 1.0 if this is called on an entity at a time when it is known if it is on screen, else it returns 0.0",
      id: "is_on_screen",
    },
    {
      documentation: "Returns 1.0 if the entity is on fire, else it returns 0.0",
      id: "is_onfire",
    },
    {
      documentation: "Returns 1.0 if the entity is orphaned, else it returns 0.0",
      id: "is_orphaned",
    },
    {
      documentation: "Returns 1.0 if the player has a persona or permium skin, else it returns 0.0",
      id: "is_persona_or_premium_skin",
    },
    {
      documentation: "Returns 1.0 if the entity is powered, else it returns 0.0",
      id: "is_powered",
    },
    {
      documentation: "Returns 1.0 if the entity is pregnant, else it returns 0.0",
      id: "is_pregnant",
    },
    {
      documentation: "Returns 1.0 if the entity is using a ram attack, else it returns 0.0",
      id: "is_ram_attacking",
    },
    {
      documentation: "Returns 1.0 if the entity is resting, else it returns 0.0",
      id: "is_resting",
    },
    {
      documentation: "Returns 1.0 if the entity is riding, else it returns 0.0",
      id: "is_riding",
    },
    {
      documentation: "returns 1.0 if the entity is currently roaring, else it returns 0.0",
      id: "is_roaring",
    },
    {
      documentation: "Returns 1.0 if the entity is rolling, else it returns 0.0",
      id: "is_rolling",
    },
    {
      documentation: "Returns 1.0 if the entity has a saddle, else it returns 0.0",
      id: "is_saddled",
    },
    {
      documentation: "Returns 1.0 if the entity is scared, else it returns 0.0",
      id: "is_scared",
    },
    {
      documentation: "returns true if the player has selected an item in the inventory, else it returns 0.0",
      id: "is_selected_item",
    },
    {
      documentation: "Returns 1.0 if the entity is casting, else it returns 0.0",
      id: "is_shaking",
    },
    {
      documentation: "returns 1.0 if the entity is shaking water off, else it returns 0.0",
      id: "is_shaking_wetness",
    },
    {
      documentation: "Returns 1.0 if the entity is able to be sheared and is sheared, else it returns 0.0",
      id: "is_sheared",
    },
    {
      documentation: "Returns 1.0f if the entity has an active powered shield if it makes sense, else it returns 0.0",
      id: "is_shield_powered",
    },
    {
      documentation: "Returns 1.0 if the entity is silent, else it returns 0.0",
      id: "is_silent",
    },
    {
      documentation: "Returns 1.0 if the entity is sitting, else it returns 0.0",
      id: "is_sitting",
    },
    {
      documentation: "Returns 1.0 if the entity is sleeping, else it returns 0.0",
      id: "is_sleeping",
    },
    {
      documentation: "Returns 1.0 if the entity is sneaking, else it returns 0.0",
      id: "is_sneaking",
    },
    {
      documentation: "Returns 1.0 if the entity is sneezing, else it returns 0.0",
      id: "is_sneezing",
    },
    {
      documentation: "Returns 1.0 if the entity is sprinting, else it returns 0.0",
      id: "is_sprinting",
    },
    {
      documentation: "Returns 1.0 if the entity is stackable, else it returns 0.0",
      id: "is_stackable",
    },
    {
      documentation: "Returns 1.0 if the entity is stalking, else it returns 0.0",
      id: "is_stalking",
    },
    {
      documentation: "Returns 1.0 if the entity is standing, else it returns 0.0",
      id: "is_standing",
    },
    {
      documentation: "returns 1.0 if the entity is currently stunned, else it returns 0.0",
      id: "is_stunned",
    },
    {
      documentation: "Returns 1.0 if the entity is swimming, else it returns 0.0",
      id: "is_swimming",
    },
    {
      documentation: "Returns 1.0 if the entity is tamed, else it returns 0.0",
      id: "is_tamed",
    },
    {
      documentation: "Returns 1.0 if the entity is transforming, else it returns 0.0",
      id: "is_transforming",
    },
    {
      documentation: "Returns 1.0 if the entity is using an item, else it returns 0.0",
      id: "is_using_item",
    },
    {
      documentation: "Returns 1.0 if the entity is climbing a wall, else it returns 0.0",
      id: "is_wall_climbing",
    },
    {
      documentation: "Returns the amount of time an item has been in use in seconds up to the maximum duration, else 0.0 if it doesn't make sense",
      id: "item_in_use_duration",
    },
    {
      documentation:
        "takes one optional hand slot as a parameter (0 or 'main_hand' for main hand, 1 or `off_hand` for off hand), and returns 1.0 if the item is charged in the requested slot (defaulting to the main hand if no parameter is supplied), otherwise returns 0.0.",
      id: "item_is_charged",
      parameters: [{ id: "slot", documentation: "0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand" }],
    },
    {
      documentation: "Returns the maximum amount of time the item can be used, else 0.0 if it doesn't make sense",
      id: "item_max_use_duration",
    },
    {
      documentation:
        "Returns the amount of time an item has left to use, else 0.0 if it doesn't make sense. Item queried is specified by the slot name `main_hand` or `off_hand`. Time remaining is normalized using the normalization value, only if one is given, else it is returned in seconds.",
      id: "item_remaining_use_duration",
    },
    {
      documentation:
        "query.item_slot_to_bone_name requires one parameter: the name of the equipment slot. This id returns the name of the bone this entity has mapped to that slot.",
      id: "item_slot_to_bone_name",
    },
    {
      documentation: "Returns the ratio between the previous and next key frames",
      id: "key_frame_lerp_time",
    },
    {
      documentation:
        "Returns the time in *seconds* of the last frame.  If an argument is passed, it is assumed to be the number of frames in the past that you wish to query.  'query.last_frame_time' (or the equivalent 'query.last_frame_time(0)') will return the frame time of the frame before the current one.  'query.last_frame_time(1)' will return the frame time of two frames ago.  Currently we store the history of the last 30 frames, although note that this may change in the future.  Passing an index more than the available data will return the oldest frame stored.",
      id: "last_frame_time",
    },
    {
      documentation: "Returns 1.0 if the entity was last hit by the player, else it returns 0.0. If called by the client always returns 0.0",
      id: "last_hit_by_player",
    },
    {
      documentation: "Returns the lie down amount for the entity",
      id: "lie_amount",
    },
    {
      documentation: "returns the limited life span of an entity, or 0.0 if it lives forever",
      id: "life_span",
    },
    {
      documentation: "Returns the time in seconds since the current animation started, else 0.0 if not called within an animation",
      id: "life_time",
    },
    {
      documentation:
        "Takes an array of distances and returns the zero - based index of which range the actor is in based on distance from the camera.For example, 'query.lod_index(10, 20, 30)' will return 0, 1, or 2 based on whether the mob is less than 10, 20, or 30 units away from the camera, or it will return 3 if it is greater than 30.",
      id: "lod_index",
    },
    {
      documentation: "debug log a value to the content log",
      id: "log",
    },
    {
      documentation: "Returns the use time maximum duration for the main hand item if it makes sense, else it returns 0.0",
      id: "main_hand_item_max_duration",
    },
    {
      documentation: "Returns the use time for the main hand item.",
      id: "main_hand_item_use_duration",
    },
    {
      documentation: "Returns the entity's mark variant",
      id: "mark_variant",
    },
    {
      documentation: "Returns the max durability an item can take",
      id: "max_durability",
    },
    {
      documentation: "Returns the maximum health of the entity, or 0.0 if it doesn't make sense to call on this entity.",
      id: "max_health",
    },
    {
      documentation: "Returns the maximum trade tier of the entity if it makes sense, else it returns 0.0",
      id: "max_trade_tier",
    },
    {
      documentation:
        "Returns the time in *seconds* of the most expensive frame over the last 'n' frames.  If an argument is passed, it is assumed to be the number of frames in the past that you wish to query.  'query.maximum_frame_time' (or the equivalent 'query.maximum_frame_time(0)') will return the frame time of the frame before the current one.  'query.maximum_frame_time(1)' will return the maximum frame time of the previous two frames.  Currently we store the history of the last 30 frames, although note that this may change in the future.  Asking for more frames will result in only sampling the number of frames stored.",
      id: "maximum_frame_time",
    },
    {
      documentation:
        "Returns the time in *seconds* of the least expensive frame over the last 'n' frames.  If an argument is passed, it is assumed to be the number of frames in the past that you wish to query.  'query.minimum_frame_time' (or the equivalent 'query.minimum_frame_time(0)') will return the frame time of the frame before the current one.  'query.minimum_frame_time(1)' will return the minimum frame time of the previous two frames.  Currently we store the history of the last 30 frames, although note that this may change in the future.  Asking for more frames will result in only sampling the number of frames stored.",
      id: "minimum_frame_time",
    },
    {
      documentation: "Returns the scale of the current entity",
      id: "model_scale",
    },
    {
      documentation:
        "Returns the total distance the entity has moved horizontally in meters (since the entity was last loaded, not necessarily since it was originally created) modified along the way by status flags such as is_baby or on_fire",
      id: "modified_distance_moved",
    },
    {
      documentation: "Returns the current walk speed of the entity modified by status flags such as is_baby or on_fire",
      id: "modified_move_speed",
    },
    {
      documentation:
        "Returns the brightness of the moon (FULL_MOON=1.0, WANING_GIBBOUS=0.75, FIRST_QUARTER=0.5, WANING_CRESCENT=0.25, NEW_MOON=0.0, WAXING_CRESCENT=0.25, LAST_QUARTER=0.5, WAXING_GIBBOUS=0.75).",
      id: "moon_brightness",
    },
    {
      documentation:
        "Returns the phase of the moon (FULL_MOON=0, WANING_GIBBOUS=1, FIRST_QUARTER=2, WANING_CRESCENT=3, NEW_MOON=4, WAXING_CRESCENT=5, LAST_QUARTER=6, WAXING_GIBBOUS=7).",
      id: "moon_phase",
    },
    {
      documentation: "returns the specified axis of the normalized position delta of the entity",
      id: "movement_direction",
      parameters: [{ id: "axis", documentation: "0 for x, 1 for y, 2 for z" }],
    },
    {
      documentation: "Queries Perlin Noise Map",
      id: "noise",
    },
    {
      documentation: "returns the time that the entity is on fire, else it returns 0.0",
      id: "on_fire_time",
    },
    {
      documentation: "Returns 1.0 if the entity is out of control, else it returns 0.0",
      id: "out_of_control",
    },
    {
      documentation: "Do not use - this id is deprecated and will be removed",
      id: "overlay_alpha",
    },
    {
      documentation: "Returns the root actor identifier",
      id: "owner_identifier",
    },
    {
      documentation: "returns the players level if the actor is a player, otherwise returns 0",
      id: "player_level",
    },
    {
      documentation:
        "Returns the absolute position of an actor. Takes one argument that represents the desired axis (0 for x-axis, 1 for y-axis, 2 for z-axis).",
      id: "position",
    },
    {
      documentation:
        "Returns the position delta for an actor. Takes one argument that represents the desired axis (0 for x-axis, 1 for y-axis, 2 for z-axis).",
      id: "position_delta",
    },
    {
      documentation: "Returns the previous squish value for the current entity, or 0.0 if this doesn't make sense",
      id: "previous_squish_value",
    },
    {
      documentation: "Returns the how much durability an item has remaining",
      id: "remaining_durability",
    },
    {
      documentation: "Returns the roll counter of the entity",
      id: "roll_counter",
    },
    {
      documentation:
        "Returns the rotation required to aim at the camera. Requires one argument representing the rotation axis you would like (0 for x, 1 for y)",
      id: "rotation_to_camera",
    },
    {
      documentation: "returns the shaking angle of the entity if it makes sense, else it returns 0.0",
      id: "shake_angle",
    },
    {
      documentation: "Returns the shake time of the entity.",
      id: "shake_time",
    },
    {
      documentation: "Returns the how much the offhand shield should translate down when blocking and being hit.",
      id: "shield_blocking_bob",
    },
    {
      documentation: "Returns the current sit amount of the entity",
      id: "sit_amount",
    },
    {
      documentation: "Returns the entity's skin ID",
      id: "skin_id",
    },
    {
      documentation: "returns the rotation of the bed the player is sleeping on.",
      id: "sleep_rotation",
    },
    {
      documentation: "Returns the sneeze counter of the entity",
      id: "sneeze_counter",
    },
    {
      documentation: "Returns 1.0 if we render the entity's bottom, else it returns 0.0",
      id: "show_bottom",
    },
    {
      documentation: "Returns the entity spell colour if it makes sense, else it returns 0.0",
      id: "spellcolor",
    },
    {
      documentation: "Returns the scale of how standing up the entity is",
      id: "standing_scale",
    },
    {
      documentation: "returns the structural integrity for the actor, otherwise returns 0",
      id: "structural_integrity",
    },
    {
      documentation: "Returns how swollen the entity is",
      id: "swell_amount",
    },
    {
      documentation: "Returns the swelling direction of the entity if it makes sense, else it returns 0.0",
      id: "swelling_dir",
    },
    {
      documentation: "Returns the amount the current entity is swimming",
      id: "swim_amount",
    },
    {
      documentation: "returns the angle of the tail of the entity if it makes sense, else it returns 0.0",
      id: "tail_angle",
    },
    {
      documentation: "Returns the x rotation required to aim at the entity's current target if it has one, else it returns 0.0",
      id: "target_x_rotation",
    },
    {
      documentation: "Returns the y rotation required to aim at the entity's current target if it has one, else it returns 0.0",
      id: "target_y_rotation",
    },
    {
      documentation: "Returns the icon index of the experience orb",
      id: "texture_frame_index",
    },
    {
      documentation: "Returns the time of day (midnight=0.0, sunrise=0.25, noon=0.5, sunset=0.75) of the dimension the entity is in.",
      id: "time_of_day",
    },
    {
      documentation: "Returns the current time stamp of the level",
      id: "time_stamp",
    },
    {
      documentation: "Returns the total number of active emitters in the world",
      id: "total_emitter_count",
    },
    {
      documentation: "Returns the total number of active particles in the world",
      id: "total_particle_count",
    },
    {
      documentation: "Returns the trade tier of the entity if it makes sense, else it returns 0.0",
      id: "trade_tier",
    },
    {
      documentation: "Returns how unhappy the entity is",
      id: "unhappy_counter",
    },
    {
      documentation: "Returns the entity's variant index",
      id: "variant",
    },
    {
      documentation: "Returns the speed of the entity up or down in metres/second, where positive is up",
      id: "vertical_speed",
    },
    {
      documentation: "Returns the walk distance of the entity.",
      id: "walk_distance",
    },
    {
      documentation: "Returns the wing flap position of the entity, or 0.0 if this doesn't make sense",
      id: "wing_flap_position",
    },
    {
      documentation: "Returns the wing flap speed of the entity, or 0.0 if this doesn't make sense",
      id: "wing_flap_speed",
    },
    {
      documentation: "Returns the entity's yaw speed",
      id: "yaw_speed",
    },
  ];
}
