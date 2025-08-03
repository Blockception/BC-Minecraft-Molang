import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { parseMolang } from "../../src/molang/syntax/parse";
import { valid_syntaxes } from "../data/dataset";
import { ExpressionNode, NodeType } from "../../src/molang/syntax/nodes";

describe("molang - syntax", () => {
  describe("should be able to parse and match the syntax tree generated", () => {
    test.each(valid_syntaxes)("%#. %s", (s) => {
      const n = parseMolang(OffsetWord.create(s, 0));
      n.forEach(cleanupNodes);
      expect(n).toMatchSnapshot();
    });
  });
});

function cleanupNodes(node: ExpressionNode) {
  switch (node.type) {
    case NodeType.StatementSequence:
      node.statements.forEach(cleanupNodes);
      break;
    case NodeType.ArrayAccess:
      [node.array, node.index].forEach(cleanupNodes);
      break;
    case NodeType.Assignment:
    case NodeType.BinaryOperation:
      [node.left, node.right].forEach(cleanupNodes);
      break;
    case NodeType.FunctionCall:
      node.arguments.forEach(cleanupNodes);
      break;
    case NodeType.UnaryOperation:
      cleanupNodes(node.operand);
      break;
    case NodeType.Conditional:
      [node.condition, node.falseExpression, node.trueExpression]
        .filter((item) => item !== undefined)
        .forEach(cleanupNodes);
      break;
    case NodeType.Literal:
      break;
  }

  // Convert type to string for each identificatio
  (node as any).type = NodeType[node.type];
}
