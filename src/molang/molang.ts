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
    /**The pattern used to find the defintions of variables*/
    export const getDefinedPatt: RegExp = /(?:^|;[ \t]*|"[ \t]*)\b(?:c|context)\.([a-z0-9_]*)[ \t]*\=/gim;

    /**The pattern used to find the variables*/
    export const getUsedPatt: RegExp = /\b(?:c|context)\.([a-z0-9_]+)\b(?![ \t]+=)/gim;

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
}
