import { RegularExpression } from "../RegExp";

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
