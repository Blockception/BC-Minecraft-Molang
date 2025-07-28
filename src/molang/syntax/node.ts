import { LexicalNode } from "./lexical/lexical";

export type Syntax = AccessOperationNode | OperationNode | UnknownNode | ConstantNode;

export enum Node {
  unknown,
  access,
  operation,
  constant,
  identifier,
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

export interface UnknownNode {
  type: Node.unknown;
  base: LexicalNode;
}

export interface ConstantNode {
  type: Node.constant | Node.identifier;
  base: LexicalNode;
}

export function toString(node: Syntax): string {
  switch (node.type) {
    case Node.identifier:
    case Node.constant:
    case Node.unknown:
      return node.base.text;
    case Node.operation:
      return `${node.operation.text}(${node.parameters.map(toString).join(",")})`;
    case Node.access:
      return `${toString(node.base)}${node.accessor.text}${toString(node.property)}`
  }
}
