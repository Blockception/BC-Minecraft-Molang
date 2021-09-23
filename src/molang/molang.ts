import { MolangFullSet, MolangSet } from "./MolangSet";
import { RegularExpression } from "./RegExp";

/**The namespace that governs molang data*/
export namespace Molang {
  /**The namespace that governs molang variables*/
  export namespace Variables {
    /**The pattern used to find the defintions of variables*/
    export const getDefinedPatt: RegExp = /(?:^|;[ \t]*|"[ \t]*)\b(?:v|variable)\.([a-z0-9_]*)[ \t]*\=/gim;

    /**The pattern used to find the variables*/
    export const getUsedPatt: RegExp = /\b(?:v|variable)\.([a-z0-9_]+)\b(?![ \t]+=)/gim;

    /**Spits through all the provided strings searching for all instances of defining variables.
     * @param data The string(s)/container to look through
     * @param receiver The receiving array*/
    export function getDefined(data: any, receiver: string[]): void {
      RegularExpression.harvest(data, getDefinedPatt, receiver);
    }

    /**Spits through all the provided strings searching for all instances of using variables
     * @param data The string(s)/container to look through
     * @param receiver The receiving array*/
    export function getUsing(data: any, receiver: string[]): void {
      RegularExpression.harvest(data, getUsedPatt, receiver);
    }
  }

  /**The namespace that governs molang variables*/
  export namespace Temps {
    /**The pattern used to find the defintions of variables*/
    export const getDefinedPatt: RegExp = /(?:^|;[ \t]*|"[ \t]*)\b(?:t|temp)\.([a-z0-9_]*)[ \t]*\=/gim;

    /**The pattern used to find the variables*/
    export const getUsedPatt: RegExp = /\b(?:t|temp)\.([a-z0-9_]+)\b(?![ \t]+=)/gim;

    /**Spits through all the provided strings searching for all instances of defining variables.
     * @param data The string(s)/container to look through
     * @param receiver The receiving array*/
    export function getDefined(data: any, receiver: string[]): void {
      RegularExpression.harvest(data, getDefinedPatt, receiver);
    }

    /**Spits through all the provided strings searching for all instances of using variables
     * @param data The string(s)/container to look through
     * @param receiver The receiving array*/
    export function getUsing(data: any, receiver: string[]): void {
      RegularExpression.harvest(data, getUsedPatt, receiver);
    }
  }

  /**The namespace that governs molang variables*/
  export namespace Context {
    /**The pattern used to find the variables*/
    export const getUsedPatt: RegExp = /\b(?:c|context)\.([a-z0-9_]+)\b(?![ \t]+=)/gim;

    /**Spits through all the provided strings searching for all instances of using variables
     * @param data The string(s)/container to look through
     * @param receiver The receiving array*/
    export function getUsing(data: any, receiver: string[]): void {
      RegularExpression.harvest(data, getUsedPatt, receiver);
    }
  }

  /**The namespace that governs molang queries*/
  export namespace Queries {
    /**The pattern used to find the used queries*/
    export const getUsedPatt: RegExp = /\b(?:q|query)\.([a-z0-9_]+)/gim;

    /**Spits through all the provided strings searching for all instances of using queries
     * @param data The string(s)/container to look through
     * @param receiver The receiving array*/
    export function getUsing(data: any, receiver: string[]): void {
      RegularExpression.harvest(data, getUsedPatt, receiver);
    }
  }

  /**The namespace that governs molang materials*/
  export namespace Materials {
    /**The pattern used to find the used materials*/
    export const getUsedPatt: RegExp = /\b(?:m|material)\.([a-z0-9_]+)/gim;

    /**Spits through all the provided strings searching for all instances of using materials
     * @param data The string(s)/container to look through
     * @param receiver The receiving array*/
    export function getUsing(data: any, receiver: string[]): void {
      RegularExpression.harvest(data, getUsedPatt, receiver);
    }
  }

  /**The namespace that governs molang geometries*/
  export namespace Geometries {
    /**The pattern used to find the used geometries*/
    export const getUsedPatt: RegExp = /\b(?:geometry)\.([a-z0-9_\.]+)/gim;

    /**Spits through all the provided strings searching for all instances of using geometries
     * @param data The string(s)/container to look through
     * @param receiver The receiving array*/
    export function getUsing(data: any, receiver: string[]): void {
      RegularExpression.harvest(data, getUsedPatt, receiver);
    }
  }

  /**The namespace that governs molang textures*/
  export namespace Textures {
    /**The pattern used to find the used textures*/
    export const getUsedPatt: RegExp = /\b(?:texture)\.([a-z0-9_]+)/gim;

    /**Spits through all the provided strings searching for all instances of using textures
     * @param data The string(s)/container to look through
     * @param receiver The receiving array*/
    export function getUsing(data: any, receiver: string[]): void {
      RegularExpression.harvest(data, getUsedPatt, receiver);
    }

    /**The namespace that governs molang arrays*/
    export namespace Arrays {
      /**The pattern used to find the used arrays*/
      export const getUsedPatt: RegExp = /\b(?:array)\.([a-z0-9_]+)/gim;

      /**Spits through all the provided strings searching for all instances of using arrays
       * @param data The string(s)/container to look through
       * @param receiver The receiving array*/
      export function getUsing(data: any, receiver: string[]): void {
        RegularExpression.harvest(data, getUsedPatt, receiver);
      }
    }
  }

  export namespace Sets {
    /**The pattern used to find the used to find most items*/
    export const getUsedPatt: RegExp = /\b(c|context|t|temp|q|query|m|math|v|variable)\.([a-z0-9_]+)\b(?![ \t]+=)/gim;
    /**The pattern used to find the used to find all items*/
    export const getFullUsedPatt: RegExp = /\b(c|context|t|temp|q|query|m|math|v|variable|texture|geometry|material|array)\.([a-z0-9_]+)\b(?![ \t]+=)/gim;
    /**The pattern used to find the used to find all defined items*/
    export const getDefinedPatt: RegExp = /(?:^|;[ \t]*|"[ \t]*)\b(v|t|variable|temp)\.([a-z0-9_]*)[ \t]*\=/gim;

    /**Spits through all the provided strings searching for all instances of using textures
     * @param data The string(s)/container to look through
     * @param receiver The receiving array*/
    export function getUsingFull(data: any, set: MolangFullSet): void {
      const receiver: string[] = [];
      RegularExpression.harvest(data, getFullUsedPatt, receiver);

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
}
