import { RegularExpression } from "../RegExp";

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
