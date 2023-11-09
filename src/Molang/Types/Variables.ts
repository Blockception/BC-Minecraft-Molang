import { RegularExpression } from "../RegExp";

/**The namespace that governs molang variables*/
export namespace Variables {
  /**The pattern used to find the definitions of variables*/
  export const getDefinedPatt: RegExp = /(?:^|;[ \t]*|"[ \t]*)\b(?:v|variable)\.([a-z0-9_\.]*)[ \t]*\=/gim;

  /**The pattern used to find the variables*/
  export const getUsedPatt: RegExp = /\b(?:v|variable)\.([a-z0-9_\.]+)\b(?![ \t]+=\b)/gim;

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
