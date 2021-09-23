import { RegularExpression } from "../RegExp";
import { MolangFullSet, MolangSet } from "../MolangSet";

/**The namespace that governs molang sets*/
export namespace Sets {
  /**The pattern used to find the used to find most items*/
  export const getUsedPatt: RegExp = /\b(c|context|t|temp|q|query|m|math|v|variable)\.([a-z0-9_]+)\b(?![ \t]+=)/gim;
  /**The pattern used to find the used to find all items*/
  export const getFullUsedPatt: RegExp =
    /\b((t|temp|v|variable)\.([a-z0-9_]+)\b(?![ \t]+=)|(c|context|q|query|m|math|texture|geometry|material|array)\.([a-z0-9_][a-z0-9_\.]+)\b)/gim;
  /**The pattern used to find the used to find all defined items*/
  export const getDefinedPatt: RegExp = /(?:^|;[ \t]*|"[ \t]*)\b(v|t|variable|temp)\.([a-z0-9_]*)[ \t]*\=/gim;

  /**Spits through all the provided strings searching for all instances of using textures
   * @param data The string(s)/container to look through
   * @param receiver The receiving array*/
  export function getUsingFull(data: any, set: MolangFullSet): void {
    const receiver: string[] = [];
    RegularExpression.harvest(data, getFullUsedPatt, receiver);

    console.log(JSON.stringify(receiver));

    for (let I = 0; I < receiver.length; I++) {
      const type = receiver[I++];
      const value = receiver[I];

      if (type && value) {
        switch (type.toLowerCase()) {
          case "c":
          case "context":
            set.contexts.using.push(value);
            break;

          case "v":
          case "variable":
            set.variables.using.push(value);
            break;

          case "t":
          case "temp":
            set.temps.using.push(value);
            break;

          case "q":
          case "query":
            set.queries.using.push(value);
            break;

          case "math":
            //TODO
            break;

          case "texture":
            set.textures.using.push(value);
            break;

          case "geometry":
            set.geometries.using.push(value);
            break;

          case "material":
            set.materials.using.push(value);
            break;
        }
      }
    }
  }

  /**Spits through all the provided strings searching for all instances of using textures
   * @param data The string(s)/container to look through
   * @param receiver The receiving array*/
  export function getUsing(data: any, set: MolangSet): void {
    const receiver: string[] = [];
    RegularExpression.harvest(data, getUsedPatt, receiver);

    for (let I = 0; I < receiver.length; I++) {
      const type = receiver[I++];
      const value = receiver[I];

      if (type && value) {
        switch (type.toLowerCase()) {
          case "c":
          case "context":
            set.contexts.using.push(value);
            break;

          case "v":
          case "variable":
            set.variables.using.push(value);
            break;

          case "t":
          case "temp":
            set.temps.using.push(value);
            break;

          case "q":
          case "query":
            set.queries.using.push(value);
            break;

          case "math":
            //TODO
            break;
        }
      }
    }
  }

  /**Spits through all the provided strings searching for all instances of using textures
   * @param data The string(s)/container to look through
   * @param receiver The receiving array*/
  export function getDefined(data: any, set: MolangSet): void {
    const receiver: string[] = [];
    RegularExpression.harvest(data, getDefinedPatt, receiver);

    for (let I = 0; I < receiver.length; I++) {
      const type = receiver[I++];
      const value = receiver[I];

      if (type && value) {
        switch (type.toLowerCase()) {
          case "v":
          case "variable":
            set.variables.defined.push(value);
            break;

          case "t":
          case "temp":
            set.temps.defined.push(value);
            break;
        }
      }
    }
  }
}
