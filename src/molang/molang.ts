/** */
export namespace molang {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is string {
    if (value) {
      if (typeof value === "string") {
        return true;
      }
    }

    return false;
  }

  /**
   *
   * @param data
   * @returns
   */
  export function getVariablesUsed(data: string): string[] {
    let matches = data.match(/([Vv]|[Vv]ariable)\.([a-zA-z0-9_]+)/gi);

    let out: string[] = [];

    if (matches) {
      for (let I = 0; I < matches.length; I++) {
        const element = matches[I];

        const index = element.indexOf(".");
        if (index > -1) {
          out.push(element.substring(index + 1, element.length));
        }
      }
    }

    return out;
  }

  /**
   *
   * @param data
   * @returns
   */
  export function getVariableDefined(data: string): string | undefined {
    let match = data.match(/^[ \t]*([Vv]ariable|[Vv])\.([a-zA-Z0-9_]+)/gi);

    if (match) {
      if (match.length >= 2) {
        return match[1];
      }
    }

    return undefined;
  }

  /**
   *
   * @param data
   * @returns
   */
  export function getQueriesUsed(data: string): string[] {
    let matches = data.match(/([Qq]uery|[Qq])\.([a-zA-Z0-9_]+)/gi);

    let out: string[] = [];

    if (matches) {
      for (let I = 0; I < matches.length; I++) {
        const element = matches[I];

        const index = element.indexOf(".");
        if (index > -1) {
          out.push(element.substring(index + 1, element.length));
        }
      }
    }

    return out;
  }
}
