/** */
export interface Defined<T> {
  /** */
  defined: T[];
}

/** */
export namespace Defined {
  /**
   *
   * @param items
   * @returns
   */
  export function create<T>(items: T[] | undefined = undefined): Defined<T> {
    if (!items) {
      items = [];
    }

    return { defined: [] };
  }

  /**
   *
   * @returns
   */
  export function empty<T>(): Defined<T> {
    return { defined: [] };
  }

  /** Check wheter or not is the given value atleast implements a Defined interface
   * @param value The object to examine
   * @returns Returns true or false wheter or not the object implements Defined*/
  export function is<T>(value: any): value is Defined<T> {
    if (typeof value === "object") {
      return Array.isArray(value.defined);
    }

    return false;
  }
}
