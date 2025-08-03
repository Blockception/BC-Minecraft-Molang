import { RegularExpression } from "../regexp";

/**The namespace that governs molang math*/
export namespace Math {
  /**The pattern used to find the used math*/
  export const getUsedPatt: RegExp = /\b(?:math)\.([a-z0-9_]+)/gim;

  /**Spits through all the provided strings searching for all instances of using math
   * @param data The string(s)/container to look through
   * @param receiver The receiving array*/
  export function getUsing(data: any, receiver: string[]): void {
    RegularExpression.harvest(data, getUsedPatt, receiver);
  }
}
