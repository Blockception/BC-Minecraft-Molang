import { DefinedUsing } from "../Types/Defined Using/DefinedUsing";
import { Using } from "../Types/Defined Using/include";
import { Context, Queries, Temps, Variables, Geometries, Textures, Materials } from "./Data/include";

/** */
export interface MolangSet {
  /** */
  contexts: Using<string>;
  /** */
  queries: Using<string>;
  /** */
  variables: DefinedUsing<string>;
  /** */
  temps: DefinedUsing<string>;
}

/** */
export interface MolangFullSet extends MolangSet {
  /** */
  materials: DefinedUsing<string>;
  /** */
  textures: DefinedUsing<string>;
  /** */
  geometries: DefinedUsing<string>;
}

/** */
export namespace MolangSet {
  /**
   *
   * @returns
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
   *
   * @param object
   * @returns
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

/**
 *
 */
export namespace MolangFullSet {
  /**
   *
   * @returns
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

  /**Add the necessary properties to the given data set to the full MolangFullSet
   * @param data
   */
  export function upgrade(data: MolangSet): MolangFullSet {
    const out = <MolangFullSet>data;

    if (!DefinedUsing.is<string>(out.geometries)) out.geometries = DefinedUsing.empty();
    if (!DefinedUsing.is<string>(out.materials)) out.materials = DefinedUsing.empty();
    if (!DefinedUsing.is<string>(out.textures)) out.textures = DefinedUsing.empty();

    return out;
  }

  /**
   *
   * @param object
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
   *
   * @param value
   */
  export function isEither(value: MolangSet | MolangFullSet): value is MolangFullSet {
    const temp = <MolangFullSet>value;

    if (typeof temp.geometries === "object" && typeof temp.materials === "object" && typeof temp.textures === "object") {
      return true;
    }

    return false;
  }
}
