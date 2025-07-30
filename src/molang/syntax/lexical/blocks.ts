import { LexicalNode, ParseError, Token } from "./lexical";

export interface CodeBlock {
  surround: "" | "()" | "{}" | "[]";
  nodes: (LexicalNode | CodeBlock)[];
}

export namespace CodeBlock {
  export function isCodeBlock(v: CodeBlock | LexicalNode): v is CodeBlock {
    return typeof (v as CodeBlock).surround === "string";
  }
}

export function toBlocks(nodes: LexicalNode[]): CodeBlock[] {
  const stats = splitStatements(nodes);
  return stats.map(statementToBlocks);
}

function statementToBlocks(statement: LexicalNode[]): CodeBlock {
  // Make brackets into blocks first, then operators
  const blocks = convertBrackets(statement);

  // Assignment check?
  splitIfOne(blocks, (item) => item.type === Token.assignment && item.text === "=");
  splitIfOne(blocks, (item) => item.type === Token.compare);

  // Operators
  splitOnFirst(blocks, (item) => item.type === Token.operator && item.text === "&&");
  splitOnFirst(blocks, (item) => item.type === Token.operator && item.text === "||");
  splitOnFirst(blocks, (item) => item.type === Token.operator && item.text === "*");
  splitOnFirst(blocks, (item) => item.type === Token.operator && item.text === "+");
  return blocks;
}

function splitStatements(nodes: LexicalNode[]): Array<Array<LexicalNode>> {
  const result: Array<Array<LexicalNode>> = [];

  let start = 0;
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.type === Token.end && n.text === ";") {
      result.push(nodes.slice(start, i));
      start = i + 1;
    }
  }

  result.push(nodes.slice(start));

  return result.filter((item) => item.length > 0);
}

function convertBrackets(nodes: LexicalNode[], surround: CodeBlock["surround"] = ""): CodeBlock {
  const result: CodeBlock = {
    surround: surround,
    nodes: [],
  };
  let lastStart = 0;

  for (let start = 0; start < nodes.length; start++) {
    const n = nodes[start];

    let endIndex = -1;
    let surround: CodeBlock["surround"] = "";
    switch (n.text) {
      default:
        continue;
      case "(":
        endIndex = endOfBracket("(", ")", start, nodes);
        surround = "()";
        break;
      case "{":
        endIndex = endOfBracket("{", "}", start, nodes);
        surround = "{}";
        break;
      case "[":
        endIndex = endOfBracket("[", "]", start, nodes);
        surround = "[]";
        break;
    }

    if (endIndex === -1) {
      throw new ParseError(n.offset, "couldn't find the end bracket for: " + n.text);
    }

    // Within the brackets
    const inner = nodes.slice(start + 1, endIndex);
    if (lastStart < start) {
      result.nodes.push(...nodes.slice(lastStart, start));
    }
    result.nodes.push(convertBrackets(inner, surround));

    lastStart = endIndex +1; // Move start to the end of all the brackets we found
    start = endIndex;
  }

  if (lastStart === 0 && result.nodes.length === 0) {
    result.nodes = nodes;
  } else if (lastStart < nodes.length) {
    result.nodes.push({
      surround: "",
      nodes: nodes.slice(lastStart),
    });
  }

  return result;
}

function endOfBracket(start: string, end: string, startIndex: number, nodes: LexicalNode[]): number {
  let level = 1;
  for (let j = startIndex + 1; j < nodes.length; j++) {
    const n = nodes[j];
    switch (n.text) {
      case start:
        level++;
        break;
      case end:
        level--;
        if (level === 0) {
          return j;
        }
        break;
    }
  }

  return -1;
}

function splitIfOne(block: CodeBlock, predicate: (item: LexicalNode) => boolean) {
  let first = -1;
  let count = 0;

  for (let i = 0; i < block.nodes.length; i++) {
    const n = block.nodes[i];
    if (!CodeBlock.isCodeBlock(n) && predicate(n)) {
      first = i;
      count++;

      // If more then one, early exit
      if (count > 1) return;
    }
  }

  if (count !== 1 || first < 0) return;
  const a = block.nodes.slice(0, first);
  const b = block.nodes.slice(first + 1);
  const splitter = block.nodes[first];
  const items: (LexicalNode | CodeBlock)[] = [
    {
      surround: "()",
      nodes: a,
    },
    splitter,
    {
      surround: "()",
      nodes: b,
    },
  ];

  // Filter out CodeBlock that are empty
  block.nodes = items.filter((b) => {
    if (CodeBlock.isCodeBlock(b) && b.nodes.length === 0) {
      return false;
    }

    return true;
  });
}

function splitOnFirst(block: CodeBlock, predicate: (item: LexicalNode) => boolean) {
  let first = -1;

  for (let i = 0; i < block.nodes.length; i++) {
    const n = block.nodes[i];
    if (!CodeBlock.isCodeBlock(n) && predicate(n)) {
      first = i;
      break;
    }
  }

  if (first < 0) return;
  const a = block.nodes.slice(0, first);
  const b = block.nodes.slice(first + 1);
  const splitter = block.nodes[first];
  const items: (LexicalNode | CodeBlock)[] = [
    {
      surround: "()",
      nodes: a,
    },
    splitter,
    {
      surround: "()",
      nodes: b,
    },
  ];

  // Filter out CodeBlock that are empty
  block.nodes = items.filter((b) => {
    if (CodeBlock.isCodeBlock(b) && b.nodes.length === 0) {
      return false;
    }

    return true;
  });
}