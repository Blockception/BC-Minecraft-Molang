import { LexicalNode, ParseError, Token } from "./lexical/lexical";
import { AccessOperationNode, ConstantNode, convertToString, Expression, FunctionCallNode, Node, Syntax } from "./node";

export function buildTree(tokens: LexicalNode[]): Expression {
  const nodes: Syntax[] = tokens.map((n) => {
    switch (n.type) {
      case Token.text:
      case Token.number:
        return {
          type: Node.constant,
          base: n,
        };
      default:
    }

    return {
      type: Node.unknown,
      base: n,
    };
  });

  return {
    nodes: buildTreeFrom(nodes),
  };
}

function buildTreeFrom(nodes: Syntax[]): Syntax {
  // Look for function definitions
  assignments(nodes);

  brackets("{", "}", nodes);
  brackets("(", ")", nodes);
  // brackets('[', ']', nodes);

  if (nodes.length === 1) {
    return nodes[0];
  }

  // TODO throw error

  return nodes[0];
}

type BracketStart = "(" | "{" | "[";
type BracketEnd = ")" | "}" | "]";

function brackets(bracketStart: BracketStart, bracketEnd: BracketEnd, nodes: Syntax[]) {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.type === Node.unknown && n.base.text === bracketStart) {
      const endIndex = findEndBracket(bracketStart, bracketEnd, i, nodes);
      if (endIndex === -1) {
        throw new ParseError(n.base.offset, `couldn't find the end pair of this ${bracketStart}${bracketEnd} pair`);
      }

      const inner = nodes.splice(i + 1, endIndex);
      nodes[i] = buildTreeFrom(inner);
    }
  }
}

/**
 * Look where the given bracket ends, expect that start, is at the node that the bracket starts at
 * @param bracketEnd the end bracket to search
 * @param start start location of the brackets pair
 * @param nodes The node to spit trough
 */
function findEndBracket(bracketStart: BracketStart, bracketEnd: BracketEnd, start: number, nodes: Syntax[]): number {
  // Find end of bracket
  let level = 0;
  for (let j = start + 1; j < nodes.length; j++) {
    const c = nodes[j];
    if (c.type !== Node.unknown) continue;
    if (c.base.text === bracketStart) level++;
    if (c.base.text === bracketEnd) {
      level++;
      if (level === 0) {
        return j;
      }
    }
  }

  return -1;
}

function assignments(nodes: Syntax[]) {
  for (let i = nodes.length - 3; i >= 0; i--) {
    // eslint-disable-next-line prefer-const
    let [first, second, thrid] = nodes.slice(i);
    if (second.type !== Node.unknown || second.base.type !== Token.access || first.type !== Node.unknown) {
      continue;
    }

    if (thrid.type === Node.unknown) {
      thrid = {
        type: Node.identifier,
        base: thrid.base,
      } as ConstantNode;
    }

    const ass: AccessOperationNode = {
      type: Node.access,
      accessor: second.base,
      base: first,
      property: thrid,
    };
    nodes[i] = ass;

    // Check if it is also a function call
    const startIndex = i + 3;
    const fourth = nodes[startIndex];
    if (fourth?.type === Node.unknown) {
      if (fourth.base.text === "(") {
        const endIndex = findEndBracket("(", ")", startIndex, nodes);
        if (endIndex === -1) {
          throw new ParseError(fourth.base.offset, `couldn't find end of this function call: ${convertToString(ass)}`);
        }
        const inner = nodes.splice(startIndex, endIndex - startIndex);

        nodes[i] = {
          type: Node.function,
          identifier: thrid,
          parameters: splitParameters(inner),
        } as FunctionCallNode;
      }
    }

    nodes.splice(i + 1, 2);
  }
}

function splitParameters(nodes: Syntax[]): Syntax[] {
  // TODO
  return nodes;
}
