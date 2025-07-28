import { RegularExpression } from "../regexp";

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
