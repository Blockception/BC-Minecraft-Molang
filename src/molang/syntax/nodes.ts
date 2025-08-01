/** Variable scope types in Molang */
export type VariableScope = "temp" | "variable" | "context" | "array";

/** Function namespace types in Molang */
export type FunctionNamespace = "math" | "query";

/** Types of syntax nodes */
export enum NodeType {
  ArrayAccess,
  Assignment,
  BinaryOperation,
  Conditional,
  FunctionCall,
  Literal = 1,
  NullishCoalescing,
  ResourceReference,
  StatementSequence,
  StringLiteral,
  UnaryOperation,
  Variable,
}

/** Base node type for all syntax tree nodes */
export interface SyntaxNode {
  position: number; // Absolute offset in the source text
}

/** Represents a unary operation (!, -) */
export interface UnaryOperationNode extends SyntaxNode {
  type: NodeType.UnaryOperation;
  operator: string;
  operand: ExpressionNode;
}

/** Represents an assignment operation */
export interface AssignmentNode extends SyntaxNode {
  type: NodeType.Assignment;
  left: ExpressionNode;
  right: ExpressionNode;
}

/** Represents a numeric literal value */
export interface LiteralNode extends SyntaxNode {
  type: NodeType.Literal;
  value: number;
}

/** Represents a string literal value */
export interface StringLiteralNode extends SyntaxNode {
  type: NodeType.StringLiteral;
  value: string;
}

/** Represents a variable reference (temp, variable, context) */
export interface VariableNode extends SyntaxNode {
  type: NodeType.Variable;
  scope: "temp" | "variable" | "context" | "array";
  name: string;
}

/** Represents a conditional (ternary) expression */
export interface ConditionalExpressionNode extends SyntaxNode {
  type: NodeType.Conditional;
  condition: ExpressionNode;
  trueExpression: ExpressionNode;
  falseExpression: ExpressionNode;
}

/** Represents a nullish coalescing operation */
export interface NullishCoalescingNode extends SyntaxNode {
  type: NodeType.NullishCoalescing;
  left: ExpressionNode;
  right: ExpressionNode;
}

/** Represents an array access operation */
export interface ArrayAccessNode extends SyntaxNode {
  type: NodeType.ArrayAccess;
  array: ExpressionNode;
  index: ExpressionNode;
}

/** Represents a function call (math, query) */
export interface FunctionCallNode extends SyntaxNode {
  type: NodeType.FunctionCall;
  namespace: "math" | "query";
  name: string;
  arguments: ExpressionNode[];
}

/** Represents a resource reference (texture, material, geometry) */
export interface ResourceReferenceNode extends SyntaxNode {
  type: NodeType.ResourceReference;
  namespace: "texture" | "material" | "geometry";
  name: string;
}

/** Represents a binary operation */
export interface BinaryOperationNode extends SyntaxNode {
  type: NodeType.BinaryOperation;
  operator: string; // +, -, *, /, ==, !=, <, >, <=, >=, &&, ||
  left: ExpressionNode;
  right: ExpressionNode;
}

/** Represents a conditional (ternary) operation */
export interface ConditionalNode extends SyntaxNode {
  type: NodeType.Conditional;
  condition: ExpressionNode;
  trueExpression: ExpressionNode;
  falseExpression?: ExpressionNode; // Optional for binary conditional
}

/** Represents a sequence of statements */
export interface StatementSequenceNode extends SyntaxNode {
  type: NodeType.StatementSequence;
  statements: ExpressionNode[];
}

/** Union type for all possible expression nodes */
export type ExpressionNode =
  | ArrayAccessNode
  | AssignmentNode
  | BinaryOperationNode
  | ConditionalExpressionNode
  | ConditionalNode
  | FunctionCallNode
  | LiteralNode
  | NullishCoalescingNode
  | ResourceReferenceNode
  | StringLiteralNode
  | UnaryOperationNode
  | VariableNode
  | StatementSequenceNode;
