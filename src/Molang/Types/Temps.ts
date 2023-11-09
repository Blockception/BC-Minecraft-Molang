import { RegularExpression } from "../RegExp";

/**The namespace that governs molang temp variables*/
export namespace Temps {
  /**The pattern used to find the definitions of temp variables*/
  export const getDefinedPattern: RegExp = /(?:^|;[ \t]*|"[ \t]*)\b(?:t|temp)\.([a-z0-9_]*)[ \t]*\=/gim;

  /**The pattern used to find the temp variables*/
  export const getUsedPattern: RegExp = /\b(?:t|temp)\.([a-z0-9_]+)\b(?![ \t]+=)/gim;

  /**Spits through all the provided strings searching for all instances of defining temp variables.
   * @param data The string(s)/container to look through
   * @param receiver The receiving array*/
  export function getDefined(data: any, receiver: string[]): void {
    RegularExpression.harvest(data, getDefinedPattern, receiver);
  }

  /**Spits through all the provided strings searching for all instances of using temp variables.
   * @param data The string(s)/container to look through
   * @param receiver The receiving array*/
  export function getUsing(data: any, receiver: string[]): void {
    RegularExpression.harvest(data, getUsedPattern, receiver);
  }
}
