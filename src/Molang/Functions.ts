export enum MolangType {
  command,
  event,
  molang,
  unknown,
}

export const eventRegex = /^@s ([\w\:\_\-]+)/im;
export const commandRegex = /^\/[a-z]+/im;
export const molangRegexp = /\b((query|math|variable|texture|temp|geometry|material|array|context|c|q|v|t)\.[A-Za-z_0-9]+|->|this)\b/im;

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
 *
 * @param molang
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
