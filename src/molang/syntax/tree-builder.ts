import { CodeBlock } from "./lexical/blocks";
import { LexicalNode, Token } from "./lexical/lexical";
import {
  AccessOperationNode,
  AssignmentNode,
  CompareNode,
  ConstantNode,
  Node,
  OperationNode,
  Syntax,
  UnknownNode,
} from "./node";

export function buildTree(code: CodeBlock | LexicalNode): Syntax {
  if (CodeBlock.isLexicalNode(code)) {
    return UnknownNode.create(code);
  }

  let result: Syntax | undefined = undefined;
  switch (code.nodes.length) {
    case 1:
      const n = code.nodes[0];
      if (Util.isType(n, Token.text) || Util.isType(n, Token.number)) {
        return ConstantNode.create(n, Node.constant);
      }
      break;
    case 5:
      result = blockWith5(code);
      break;
    case 3:
      result = blockWith3(code);
      break;
    case 2:
      result = blockWith2(code);
      break;
  }

  if (result) return result;

  throw new Error("todo");
  return {} as Syntax;
}

function blockWith5(code: CodeBlock): Syntax | undefined {
  const [n1, n2, n3, n4, n5] = code.nodes;

  switch (true) {
    case Util.isType(n1, Token.keyword) &&
      Util.isType(n2, Token.access) &&
      Util.isType(n3, Token.identifier) &&
      Util.isType(n4, Token.access) &&
      Util.isType(n5, Token.identifier):
      return AccessOperationNode.create(
        n2,
        buildTree(n1),
        AccessOperationNode.create(n4, buildTree(n3), buildTree(n5))
      );
  }

  return undefined;
}

function blockWith3(code: CodeBlock): Syntax | undefined {
  const [n1, n2, n3] = code.nodes;

  if (Util.isType(n2, Token.operator)) {
    return OperationNode.create(n2, buildTree(n1), buildTree(n3));
  }
  if (Util.isType(n2, Token.compare)) {
    return CompareNode.create(buildTree(n1), buildTree(n3), n2);
  }

  if (Util.isType(n2, Token.assignment)) {
    return AssignmentNode.create(buildTree(n1), buildTree(n3));
  }

  switch (true) {
    case Util.isType(n1, Token.keyword) && Util.isType(n2, Token.access) && Util.isType(n3, Token.identifier):
      return AccessOperationNode.create(
        n2,
        buildTree(n1),
        AccessOperationNode.create(n2, buildTree(n1), buildTree(n3))
      );
  }

  return undefined;
}

function blockWith2(code: CodeBlock): Syntax | undefined {
  const [first, second] = code.nodes;
  if (Util.isType(first, Token.operator)) {
    switch (first.text) {
      case "!":
        return OperationNode.create(first, buildTree(second));
    }
  }

  return undefined;
}

namespace Util {
  export function isType<T extends Token>(node: LexicalNode | CodeBlock, type: T): node is LexicalNode & { type: T } {
    return (node as LexicalNode).type === type;
  }

  export function isCodeBlockWith(
    node: LexicalNode | CodeBlock,
    predicate: (node: CodeBlock) => boolean
  ): node is CodeBlock {
    return CodeBlock.isCodeBlock(node) && predicate(node);
  }
}
