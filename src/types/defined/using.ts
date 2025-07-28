/** */
export interface Using<T> {
  /** */
  using: T[];
}

/** */
export namespace Using {
  /**
   *
   * @param items
   * @returns
   */
  export function create<T>(items: T[] | undefined = undefined): Using<T> {
    if (!items) {
      items = [];
    }

    return { using: [] };
  }

  /**
   *
   * @returns
   */
  export function empty<T>(): Using<T> {
    return { using: [] };
  }

  /** Check wheter or not is the given value atleast implements a Using interface
   * @param value The object to examine
   * @returns Returns true or false wheter or not the object implements Using*/
  export function is<T>(value: any): value is Using<T> {
    if (typeof value === "object") {
      return Array.isArray(value.using);
    }

    return false;
  }
}
