import { Data } from "./Data";

import { Animations as MAnimations } from "./Animations";
import { AnimationsControllers as MAnimationsControllers } from "./AnimationsControllers";
import { Blocks as MBlocks } from "./Blocks";
import { Entities as MEntities } from "./Entities";
import { FeaturesRules as MFeaturesRules } from "./FeaturesRules";
import { General as MGeneral } from "./General";
import { Items as MItems } from "./Items";
import { Particles as MParticles } from "./Particles";
import { RenderControllers as MRenderControllers } from "./RenderControllers";

/**Molang data for all types*/
export interface MolangDataSet {
  /**Molang data for variables*/
  Variables: Data[];
  /**Molang data for contexts*/
  Contexts: Data[];
  /**Molang data for temp variables*/
  Temps: Data[];
}

/**
 * Molang data for all types
 */
export namespace MolangData {
  /**Molang data for animations*/
  export const Animations = MAnimations;
  /**Molang data for animations controllers*/
  export const AnimationsControllers = MAnimationsControllers;
  /**Molang data for blocks*/
  export const Blocks = MBlocks;
  /**Molang data for entities*/
  export const Entities = MEntities;
  /**Molang data for features rules*/
  export const FeaturesRules = MFeaturesRules;
  /**Molang data for general*/
  export const General = MGeneral;
  /**Molang data for items*/
  export const Items = MItems;
  /**Molang data for particles*/
  export const Particles = MParticles;
  /**Molang data for render controllers*/
  export const RenderControllers = MRenderControllers;

  /** Returns the specified type of molang data */
  export function get(type: MolangDataSetKey): MolangDataSet {
    return MolangData[type] as MolangDataSet;
  }
}

/**
 * The list of all types
 */
export type MolangDataSetKey =
  | "Animations"
  | "AnimationsControllers"
  | "Blocks"
  | "Entities"
  | "FeaturesRules"
  | "General"
  | "Items"
  | "Particles"
  | "RenderControllers";
