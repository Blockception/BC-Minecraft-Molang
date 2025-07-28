import { DefinedUsing } from "../types/defined/DefinedUsing";
import { Using } from "../types/defined";
import { Context, Queries, Temps, Variables, Geometries, Textures, Materials } from "./Types";

/** Can either be a MolangSet or a MolangSet[] */
export type MolangSetOptional = MolangSet | MolangFullSet;

/** The interface for the molang set */
export interface MolangSet {
  /** The set of contexts variables used*/
  contexts: Using<string>;
  /** The set of queries used */
  queries: Using<string>;
  /** The set of variables defined and used*/
  variables: DefinedUsing<string>;
  /** The set of temps variables defined and used*/
  temps: DefinedUsing<string>;
}

/** The interface for the molang with the full set of data */
export interface MolangFullSet extends MolangSet {
  /** The set of geometries used */
  geometries: DefinedUsing<string>;
  /** The set of materials used */
  materials: DefinedUsing<string>;
  /** The set of textures used */
  textures: DefinedUsing<string>;
}

/** The namespace for the molang set */
export namespace MolangSet {
  /**
   * Creates a new MolangSet
   * @returns A new MolangSet
   */
  export function create(): MolangSet {
    return {
      queries: Using.create<string>(),
      variables: DefinedUsing.create<string>(),
      temps: DefinedUsing.create<string>(),
      contexts: Using.create<string>(),
    };
  }

  /**
   * Harvests molang data from the given object
   * @param object The object to harvest from
   * @returns The molang data
   */
  export function harvest(object: any): MolangSet {
    const out = create();

    Queries.getUsing(object, out.queries.using);
    Context.getUsing(object, out.contexts.using);

    Variables.getUsing(object, out.variables.using);
    Variables.getDefined(object, out.variables.defined);

    Temps.getUsing(object, out.temps.using);
    Temps.getDefined(object, out.temps.defined);

    return out;
  }
}

/** The namespace for the full molang set */
export namespace MolangFullSet {
  /**
   * Creates a new MolangFullSet
   * @returns A new MolangFullSet
   */
  export function create(): MolangFullSet {
    return {
      queries: Using.create<string>(),
      variables: DefinedUsing.create<string>(),
      temps: DefinedUsing.create<string>(),
      contexts: Using.create<string>(),
      geometries: DefinedUsing.empty(),
      materials: DefinedUsing.empty(),
      textures: DefinedUsing.empty(),
    };
  }

  /**
   * Add the necessary properties to the given data set to the full MolangFullSet
   * @param data The data to add to
   */
  export function upgrade(data: MolangSet): MolangFullSet {
    const out = data as MolangFullSet;

    if (!DefinedUsing.is<string>(out.geometries)) out.geometries = DefinedUsing.empty();
    if (!DefinedUsing.is<string>(out.materials)) out.materials = DefinedUsing.empty();
    if (!DefinedUsing.is<string>(out.textures)) out.textures = DefinedUsing.empty();

    return out;
  }

  /**
   * Harvests molang data from the given object
   * @param object The object to harvest from
   */
  export function harvest(object: object | string): MolangFullSet {
    const out = create();

    Queries.getUsing(object, out.queries.using);
    Context.getUsing(object, out.contexts.using);

    Variables.getUsing(object, out.variables.using);
    Variables.getDefined(object, out.variables.defined);

    Temps.getUsing(object, out.temps.using);
    Temps.getDefined(object, out.temps.defined);

    Textures.getUsing(object, out.textures.using);
    Geometries.getUsing(object, out.geometries.using);
    Materials.getUsing(object, out.materials.using);

    return out;
  }

  /**
   * Merges the given MolangFullSet into the given MolangFullSet
   * @param value
   */
  export function isEither(value: MolangSetOptional): value is MolangFullSet {
    const temp = value as MolangFullSet;

    if (
      typeof temp.geometries === "object" &&
      typeof temp.materials === "object" &&
      typeof temp.textures === "object"
    ) {
      return true;
    }

    return false;
  }

  export function fromScript(script: { variables?: Record<string, string> }, addTo: MolangSet): void {
    if (script.variables) {
      const keys = Object.getOwnPropertyNames(script.variables);

      for (let I = 0; I < keys.length; I++) {
        const key = keys[I];
        if (typeof key !== "string") {
          continue;
        }
        const index = key.indexOf(".");
        if (index < 0) {
          continue;
        }
        const id = key.substring(index + 1);
        if (id && id.length > 0) {
          addTo.variables.defined.push(id);
        }
      }
    }
  }
}
