import { Defined } from "./Defined";
import { Using } from "./Using";

/** */
export interface DefinedUsing<T> extends Defined<T>, Using<T> {}

/** */
export namespace DefinedUsing {
  /**
   *
   * @param using
   * @param defined
   * @returns
   */
  export function create<T>(using: T[] | undefined = undefined, defined: T[] | undefined = undefined): DefinedUsing<T> {
    if (!using) using = [];
    if (!defined) defined = [];

    return {
      defined: defined,
      using: using,
    };
  }

  /**
   *
   * @returns
   */
  export function empty<T>(): DefinedUsing<T> {
    return { defined: [], using: [] };
  }

  /** Check wheter or not is the given value atleast implements a DefinedUsing interface
   * @param value The object to examine
   * @returns Returns true or false wheter or not the object implements DefinedUsing*/
  export function is<T>(value: any): value is DefinedUsing<T> {
    if (typeof value === "object") {
      if (Array.isArray(value.using) && Array.isArray(value.defined)) {
        return true;
      }
    }

    return false;
  }
}
