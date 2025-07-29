import { LexicalNode } from "./lexical";

export interface CodeBlock {
  nodes: (LexicalNode | CodeBlock)[];
}

export function toBlocks(nodes: LexicalNode[]): CodeBlock[] {
  // Make brackets into blocks first, then operators

  return [
    {
      nodes,
    },
  ];
}
