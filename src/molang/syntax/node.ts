import { LexicalNode, LexicalNodeWith } from "./lexical/lexical";

export type Syntax = AccessOperationNode | OperationNode | UnknownNode | ConstantNode | FunctionCallNode;

export enum Node {
  unknown,
  access,
  operation,
  constant,
  identifier,
  function,
  compare,
}

export interface Expression {
  nodes: Syntax;
}

export interface AccessOperationNode {
  type: Node.access;
  accessor: LexicalNode; // -> or .
  base: Syntax;
  property: Syntax;
}

export interface OperationNode {
  type: Node.operation;
  operation: LexicalNode;
  parameters: Syntax[];
}

export interface CompareNode {
  type: Node.compare
  a: Syntax;
  b: Syntax;
  operator: LexicalNodeWith<">" | "<" | "==" | "!=" | ">=" | "<=">;
}

export interface UnknownNode {
  type: Node.unknown;
  base: LexicalNode;
}

export interface ConstantNode {
  type: Node.constant | Node.identifier;
  base: LexicalNode;
}

export interface FunctionCallNode {
  type: Node.function;
  identifier: Syntax;
  parameters: Syntax[];
}

export function convertToString(node: Syntax): string {
  switch (node.type) {
    case Node.identifier:
    case Node.constant:
    case Node.unknown:
      return node.base.text;
    case Node.operation:
      return `${node.operation.text}(${node.parameters.map(convertToString).join(",")})`;
    case Node.access:
      return `${convertToString(node.base)}${node.accessor.text}${convertToString(node.property)}`;
    case Node.function:
      return `${convertToString(node.identifier)}(${node.parameters.map(convertToString).join(", ")})`;
  }
}
