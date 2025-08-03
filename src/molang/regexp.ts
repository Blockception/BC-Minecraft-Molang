/** A namespace that contains regular expressions for Molang */
export namespace RegularExpression {
  /**
   * Matches a Molang variable
   * @param data The data to match
   * @param regexp The regular expression to use
   * @param receiver  The array to receive the matches
   */
  export function harvest(data: any, regexp: RegExp, receiver: string[]): void {
    if (typeof data === "string") data = [data];

    if (Array.isArray(data)) {
      harvestArray(data, regexp, receiver);
    } else {
      harvestObject(data, regexp, receiver);
    }
  }

  /**
   * Harvests the data from the array
   * @param data The data to match
   * @param regexp The regular expression to use
   * @param receiver The array to receive the matches
   */
  export function harvestArray(data: string[] | any[], regexp: RegExp, receiver: string[]): void {
    for (let I = 0; I < data.length; I++) {
      const elem = data[I];

      switch (typeof elem) {
        case "string":
          harvestString(elem, regexp, receiver);
          break;

        case "object":
          harvest(elem, regexp, receiver);
          break;
      }
    }
  }

  /**
   * Harvests the data from the object
   * @param data The data to match
   * @param regexp The regular expression to use
   * @param receiver The array to receive the matches
   */
  export function harvestObject(data: any, regexp: RegExp, receiver: string[]): void {
    const keys = Object.getOwnPropertyNames(data);

    for (let I = 0; I < keys.length; I++) {
      const k = keys[I];
      const elem = data[k];

      switch (typeof elem) {
        case "string":
          harvestString(elem, regexp, receiver);
          break;

        case "object":
          harvest(elem, regexp, receiver);
      }
    }
  }

  /**
   * Harvests the data from the string
   * @param data The data to match
   * @param regexp The regular expression to use
   * @param receiver The array to receive the matches
   */
  export function harvestString(data: string, regexp: RegExp, receiver: string[]): void {
    let matches = regexp.exec(data);

    while (matches) {
      if (matches && matches.length >= 2) {
        const v = matches[1];

        if (!receiver.includes(v)) receiver.push(v);
      }

      matches = regexp.exec(data);
    }
  }
}
