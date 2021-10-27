export enum MolangType {
  command,
  event,
  molang,
  unknown
}

export const eventRegex = /^@s ([\w\:\_\-]+)/im;
export const commandRegex = /^\/[a-z]+/im;
export const molangRegexp = /\b((query|math|variable|texture|temp|geometry|material|array|context|c|q|v|t)\.[A-Za-z_0-9]+|->|this)\b/im;

export function IsMolangType(data : string) : MolangType {
  if (commandRegex.test(data)) return MolangType.command;
  if (eventRegex.test(data)) return MolangType.event;
  if (molangRegexp.test(data)) return MolangType.molang;


  return MolangType.unknown;
}