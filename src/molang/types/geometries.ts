import { RegularExpression } from "../regexp";

/**The namespace that governs molang geometries*/
export namespace Geometries {
  /**The pattern used to find the used geometries*/
  export const getUsedPatt: RegExp = /\b(?:geometry)\.([a-z0-9_][a-z0-9_.]+)/gim;

  /**Spits through all the provided strings searching for all instances of using geometries
   * @param data The string(s)/container to look through
   * @param receiver The receiving array*/
  export function getUsing(data: any, receiver: string[]): void {
    RegularExpression.harvest(data, getUsedPatt, receiver);
  }
}
