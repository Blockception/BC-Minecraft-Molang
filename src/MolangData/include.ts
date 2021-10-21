import { Animations } from "./Animations";
import { AnimationsControllers } from "./AnimationsControllers";
import { Blocks } from "./Blocks";
import { Entities } from "./Entities";
import { FeaturesRules } from "./FeaturesRules";
import { Items } from "./Items";
import { Particles } from "./Particles";
import { RenderControllers } from "./RenderControllers";

export * from "./Data";
export * from "./General";
export { Animations, AnimationsControllers, Blocks, Entities, FeaturesRules, Items, Particles, RenderControllers };

/**Returns either an object with molang data or undefined
 * @param id The identification of molang data to return
 * @returns A namespace carrying the data or undefined if nothing was found*/
export function get(
  id: "animation" | "animation_controller" | "block" | "entity" | "feature" | "item" | "particle" | "render_controller"
): typeof Blocks | undefined {
  switch (id) {
    case "animation":
      return Animations;

    case "animation_controller":
      return AnimationsControllers;

    case "block":
      return Blocks;

    case "entity":
      return Entities;

    case "feature":
      return FeaturesRules;

    case "item":
      return Items;

    case "particle":
      return Particles;

    case "render_controller":
      return RenderControllers;
  }

  return undefined;
}
