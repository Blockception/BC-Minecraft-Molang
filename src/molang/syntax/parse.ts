import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { ExpressionNode, NodeType } from "./nodes";
import { Token, TokenType, tokenize } from "./tokens";

/** Represents a syntax error in the Molang code */
export class MolangSyntaxError extends Error {
  constructor(message: string, public position: number, public code: string) {
    super(message);
    this.name = "MolangSyntaxError";
  }
}

/** Main function to parse Molang code into a syntax tree */
export function parseMolang(line: OffsetWord): ExpressionNode {
  const tokens = tokenize(line.text);
  const parser = new MolangParser(tokens, line.offset);

  return parser.parse();
}

/** Parser class to convert tokens into a syntax tree */
class MolangParser {
  private currentTokenIndex = 0;

  constructor(private tokens: Token[], private baseOffset: number) {}

  parse(): ExpressionNode {
    return {
      type: NodeType.StatementSequence,
      statements: [],
      position: this.baseOffset,
    };
  }

  private makePosition(offset: number): number {
    // Add the base offset from OffsetWord to get absolute position
    return this.baseOffset + offset;
  }

  private error(message: string): MolangSyntaxError {
    const pos = this.makePosition(this.peek().position);
    return new MolangSyntaxError(message, pos, this.tokens[this.currentTokenIndex]?.value || "");
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.currentTokenIndex];
  }

  private previous(): Token {
    return this.tokens[this.currentTokenIndex - 1];
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.currentTokenIndex++;
    return this.previous();
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    throw this.error(message);
  }

  private match(type: TokenType): boolean {
    if (this.check(type)) {
      this.advance();
      return true;
    }
    return false;
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }
}
