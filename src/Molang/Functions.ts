
export enum MolangType {
  command,
  event,
  molang,
  unknown,
}

export const eventRegex = /^@s ([\w\:\_\-]+)/im;
export const commandRegex = /^\/[a-z]+/im;
export const molangRegexp =
  /\b((query|math|variable|texture|temp|geometry|material|array|context|c|q|v|t)\.[A-Za-z_0-9]+|->|this)\b/im;

export function IsMolangType(data: string): MolangType {
  if (commandRegex.test(data)) return MolangType.command;
  if (eventRegex.test(data)) return MolangType.event;
  if (molangRegexp.test(data)) return MolangType.molang;

  return MolangType.unknown;
}

/**Already assumes that the given data is of type MolangType.event
 * @param data The text to parse*/
export function getEvent(data: string): string {
  return data.slice(3).trim();
}

/**
 * Checks if the given data is a valid molang expression
 * @param molang The molang expression to check
 * @returns True if the given molang expression is valid
 */
export function isValidMolang(molang: string): boolean {
  let instr = false;
  let level = 0;

  for (let I = 0; I < molang.length; I++) {
    switch (molang[I]) {
      case "'":
        instr = !instr;

      case "[":
      case "{":
      case "(":
        if (!instr) level++;
        break;

      case "]":
      case ")":
      case "}":
        if (!instr) level--;
        break;
    }
  }

  return level === 0 && instr === false;
}

/**
 * Finds the specific molang expression in the given text
 * @param molang The text to parse
 * @param startindex The index to start searching from
 * @param find The molang expression to find
 * @returns The index of the molang expression
 */
export function find(molang: string, startindex: number, find: string): number {
  let instr = false;
  let level = 0;
  let length = find.length;
  let max = molang.length - length;

  for (let I = startindex; I < max; I++) {
    if (level === 0 && instr === false) {
      if (molang.slice(I, I + length) === find) {
        return I;
      }
    }

    switch (molang[I]) {
      case "'":
        instr = !instr;

      case "[":
      case "{":
      case "(":
        if (!instr) level++;
        break;

      case "]":
      case ")":
      case "}":
        if (!instr) level--;
        break;
    }
  }

  return -1;
}
