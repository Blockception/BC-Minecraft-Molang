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

export interface MolangDataSet {
  Variables: Data[];
  Contexts: Data[];
  Temps: Data[];
}

export namespace MolangData {
  export const Animations = MAnimations;
  export const AnimationsControllers = MAnimationsControllers;
  export const Blocks = MBlocks;
  export const Entities = MEntities;
  export const FeaturesRules = MFeaturesRules;
  export const General = MGeneral;
  export const Items = MItems;
  export const Particles = MParticles;
  export const RenderControllers = MRenderControllers;

  export function get(type: MolangDataSetKey): MolangDataSet {
    return MolangData[type] as MolangDataSet;
  }
}

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
