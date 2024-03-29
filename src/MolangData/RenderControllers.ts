import { Data } from "./Data";

/**Molang data for render controllers*/
export namespace RenderControllers {
  /**The list of usable variables for this specific type*/
  export const Variables: Data[] = [{ id: "attack_time" }];
  /**The list of specific contexts usable for this specific type*/
  export const Contexts: Data[] = [{ id: "is_first_person" }, { id: "item_slot" }];
  /**The list of usable temp variables for this specific type*/
  export const Temps: Data[] = [];
}
