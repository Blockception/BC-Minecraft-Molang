import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { isNumberOrLetter } from './util';

export class ParseError extends Error {
  offset: number;
  index: number;
  base: Partial<Error>;

  constructor(message: string, base: Partial<Error>, index: number, offset: number) {
    super(message);
    this.base = base;
    this.name = "molang-parse-error";
    this.stack = base.stack;
    this.index = index;
    this.offset = offset;
  }
}

export function parseLexical(line: OffsetWord | string): LexicalNode[] {
  if (typeof line === "string") {
    const parser = new Parser(line);
    try {
      parser.parse();
    } catch (err: any) {
      throw new ParseError(err.message ?? "parsing error occured", err, parser.index, 0);
    }

    return parser.result;
  }

  const parser = new Parser(line.text);

  try {
    parser.parse();
    // Process offset
    parser.moveOffset(line.offset);
  } catch (err: any) {
    throw new ParseError(err.message ?? "parsing error occured", err, parser.index, 0);
  }

  return parser.result;
}

export enum Token {
  unknown,
  access,
  assignment,
  constant,
  identifier,
  keyword,
  operator,
  punction,
  number,
  text,
  end,
}

export interface LexicalNode {
  text: string;
  offset: number;
  type: Token;
}

class Parser {
  result: LexicalNode[];
  start: number;
  index: number;
  text: string;
  offset: number;

  constructor(text: string) {
    this.result = [];
    this.text = text;
    this.start = 0;
    this.index = 0;
    this.offset = 0;
  }

  push(text: string, offset: number, type: Token): LexicalNode {
    const item = {
      text,
      offset: this.offset + offset,
      type,
    };
    this.result.push(item);
    return item;
  }

  moveIndex(amount: number) {
    this.index += amount;
  }

  moveStart(amount: number) {
    this.start += amount;
  }

  setStart(index: number) {
    this.start = index;
  }

  /**
   * Adds an offset to each item in the parser present
   * @param amount
   */
  moveOffset(amount: number) {
    this.result.forEach((item) => (item.offset += amount));
  }

  /** Assumes that the character at index needs to be isolated into its own node */
  isolateCurrent(length: number, charType: Token) {
    const endIndex = this.index + length;
    // We know that all text before this is its own thing, the found character its own thing and the rest still needs to be parsed
    this.push(this.text.slice(0, this.index), this.start, Token.unknown);
    this.push(this.text.slice(this.index, endIndex), this.index, charType);

    // Move our location further ahead, and put the indexes back at the beginnning;
    this.offset += endIndex;
    this.text = this.text.slice(endIndex);
    this.index = 0;
    this.start = 0;
  }

  parse() {
    // Moves along the text, until we can find things that we can split, then we identify and move further
    while (this.text.length > 0) {
      if (isNumberOrLetter(this.text.charCodeAt(this.index))) {
        this.index++;
        continue;
      }

      this.parseAt();
    }
  }

  // Does one round of parsing
  private parseAt() {
    let c = this.text.slice(this.index, this.index + 2);
    switch (c) {
      case "": // End of the string
      case undefined:
        this.push(this.text, this.start, Token.unknown);
        this.text = "";
        return;

      case "==":
      case "!":
      case "||":
      case "&&":
      case "<":
      case "<=":
      case ">=":
      case ">":
      case "!=":
      case "??":
        return this.isolateCurrent(2, Token.operator);
      case "->":
        return this.isolateCurrent(length, Token.access);
    }

    // Character that we can cut around, like operators
    c = c.slice(0, 1);
    switch (c) {
      case "": // End of the string
      case undefined:
        this.push(this.text, this.start, Token.unknown);
        this.text = "";
        return;

      // Basic math operators
      case "-":
      case "!":
      case "?":
      case "*":
      case "/":
      case "+":
      case "<":
      case ">":
      case ":":
        return this.isolateCurrent(1, Token.operator);
      case ";":
      case ",":
      case ".":
        return this.isolateCurrent(1, Token.punction);
      case "'":
      case '"':
      case "(":
      case ")":
      case "[":
      case "]":
      case "{":
      case "}":
        return this.isolateCurrent(1, Token.unknown);
      case "=":
        return this.isolateCurrent(1, Token.assignment);
    }

    this.moveIndex(1);
  }
}
