import { RegularExpression } from "../regexp";

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
