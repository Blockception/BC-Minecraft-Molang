import { LexicalNode } from "./lexical/lexical";

export type Syntax =
  | AccessOperationNode
  | AssignmentNode
  | CompareNode
  | ConstantNode
  | OperationNode
  | FunctionCallNode
  | UnknownNode;

export enum Node {
  unknown,
  access,
  assignment,
  constant,
  function,
  identifier,
  operation,
  compare,
}

export interface Expression {
  nodes: Syntax;
}

export interface AssignmentNode {
  type: Node.assignment;
  receiver: Syntax;
  value: Syntax;
}

export namespace AssignmentNode {
  /**
   *
   * @param accessor the node with . or ->
   * @param base
   * @param property
   * @returns
   */
  export function create(receiver: Syntax, value: Syntax): AssignmentNode {
    return { type: Node.assignment, receiver, value };
  }
}

export interface AccessOperationNode {
  type: Node.access;
  accessor: LexicalNode; // -> or .
  base: Syntax;
  property: Syntax;
}

export namespace AccessOperationNode {
  /**
   *
   * @param accessor the node with . or ->
   * @param base
   * @param property
   * @returns
   */
  export function create(accessor: LexicalNode, base: Syntax, property: Syntax): AccessOperationNode {
    return { type: Node.access, accessor, base, property };
  }
}

export interface OperationNode {
  type: Node.operation;
  operation: LexicalNode;
  parameters: Syntax[];
}

export namespace OperationNode {
  export function create(operation: LexicalNode, ...parameters: Syntax[]): OperationNode {
    return { type: Node.operation, operation, parameters };
  }
}

export interface CompareNode {
  type: Node.compare;
  a: Syntax;
  b: Syntax;
  operator: LexicalNode;
}

export namespace CompareNode {
  export function create(a: Syntax, b: Syntax, operator: LexicalNode): CompareNode {
    return { type: Node.compare, a, b, operator };
  }
}

export interface UnknownNode {
  type: Node.unknown;
  base: LexicalNode;
}

export namespace UnknownNode {
  export function create(base: LexicalNode): UnknownNode {
    return { type: Node.unknown, base };
  }
}

export interface ConstantNode {
  type: Node.constant | Node.identifier;
  base: LexicalNode;
}

export namespace ConstantNode {
  export function create(base: LexicalNode, type: Node.constant | Node.identifier): ConstantNode {
    return { type, base };
  }
}

export interface FunctionCallNode {
  type: Node.function;
  identifier: Syntax;
  parameters: Syntax[];
}

export namespace FunctionCallNode {
  export function create(identifier: Syntax, parameters: Syntax[]): FunctionCallNode {
    return { type: Node.function, identifier, parameters };
  }
}

export function convertToString(node: Syntax): string {
  switch (node.type) {
    case Node.compare:
      return `${convertToString(node.a)}${node.operator.text}${convertToString(node.b)}`;
    case Node.identifier:
    case Node.constant:
    case Node.unknown:
      return node.base.text;
    case Node.operation:
      return `(${node.parameters.map(convertToString).join(node.operation.text)})`;
    case Node.access:
      return `${convertToString(node.base)}${node.accessor.text}${convertToString(node.property)}`;
    case Node.function:
      return `${convertToString(node.identifier)}(${node.parameters.map(convertToString).join(", ")})`;
    case Node.assignment:
      return `${convertToString(node.receiver)}=${convertToString(node.value)}`;
  }
}
