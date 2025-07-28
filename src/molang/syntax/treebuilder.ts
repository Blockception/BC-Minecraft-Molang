import { LexicalNode, Token } from "./lexical/lexical";
import { AccessOperationNode, ConstantNode, Expression, Node, Syntax } from "./node";

export function buildTree(tokens: LexicalNode[]): Expression {
  const nodes: Syntax[] = tokens.map((n) => {
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
  brackets("{", "}", nodes);
  brackets("(", ")", nodes);
  // brackets('[', ']', nodes);

  assignments(nodes);

  if (nodes.length === 1) {
    return nodes[0];
  }

  // TODO throw error

  return nodes[0];
}

function brackets(bracketStart: string, bracketEnd: string, nodes: Syntax[]) {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.type === Node.unknown && n.base.text === bracketStart) {
      // Find end of bracket
      let level = 0;
      for (let j = i + 1; j < nodes.length; j++) {
        const c = nodes[j];
        if (c.type !== Node.unknown) continue;
        if (c.base.text === bracketStart) level++;
        if (c.base.text === bracketEnd) {
          level++;
          if (level === 0) {
            const inner = nodes.splice(i + 1, i - j);
            nodes[i] = buildTreeFrom(inner);
          }
        }
      }
    }
  }
}

function assignments(nodes: Syntax[]) {
  for (let i = nodes.length - 3; i >= 0; i--) {
    // eslint-disable-next-line prefer-const
    let [first, second, thrid] = nodes.slice(i, i + 3);
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
    nodes.splice(i + 1, 2);
  }
}
