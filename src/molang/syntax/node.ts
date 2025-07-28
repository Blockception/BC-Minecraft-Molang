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
