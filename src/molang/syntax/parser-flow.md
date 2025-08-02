# Molang Parser Flow

```mermaid
graph TD
    Start[parseMolang] --> Tokenize[tokenize]
    Tokenize --> Split[splitTokensIntoStatements]
    Split --> Parse[parse]

    %% Main parsing flow with precedence levels
    Parse --> ParseStmt[parseStatement]
    ParseStmt --> ParseAssign[parseAssignment]
    ParseAssign --> ParseCond[parseConditional]
    ParseCond --> ParseOr[parseLogicalOr]
    ParseOr --> ParseAnd[parseLogicalAnd]
    ParseAnd --> ParseEq[parseEquality]
    ParseEq --> ParseComp[parseComparison]
    ParseComp --> ParseTerm[parseTerm]
    ParseTerm --> ParseFactor[parseFactor]
    ParseFactor --> ParseUnary[parseUnary]
    ParseUnary --> ParsePrim[parsePrimary]

    %% Primary expression types
    ParsePrim --> |Number|Number[NodeType.Literal]
    ParsePrim --> |String|String[NodeType.StringLiteral]
    ParsePrim --> |Variable|Var[NodeType.Variable]
    ParsePrim --> |Function|Func[NodeType.FunctionCall]
    ParsePrim --> |Parentheses|ParseExpr[parseExpression]

    %% Operator precedence and node types
    ParseAssign --> |"="|Assignment[NodeType.Assignment]
    ParseCond --> |"? :"|Conditional[NodeType.Conditional]
    ParseOr --> |"||"|BinOp1[NodeType.BinaryOperation]
    ParseAnd --> |"&&"|BinOp2[NodeType.BinaryOperation]
    ParseEq --> |"==, !="|BinOp3[NodeType.BinaryOperation]
    ParseComp --> |"<, >, <=, >="|BinOp4[NodeType.BinaryOperation]
    ParseTerm --> |"+, -"|BinOp5[NodeType.BinaryOperation]
    ParseFactor --> |"*, /"|BinOp6[NodeType.BinaryOperation]
    ParseUnary --> |"!, -"|Unary[NodeType.UnaryOperation]

    %% Variable scopes
    Var --> |scope|VarScope["temp
    variable
    context
    array"]

    %% Function namespaces
    Func --> |namespace|FuncNS["math
    query"]

    classDef orange fill:#f96,stroke:#333,stroke-width:2px;
    classDef blue fill:#69f,stroke:#333,stroke-width:2px;
    classDef green fill:#9f6,stroke:#333,stroke-width:2px;

    class Start,Tokenize,Split orange;
    class Number,String,Var,Func,Assignment,Conditional,BinOp1,BinOp2,BinOp3,BinOp4,BinOp5,BinOp6,Unary blue;
    class VarScope,FuncNS green;
```

This diagram shows the precedence-based parsing flow of the Molang parser:

1. Entry point through `parseMolang`
   - Tokenizes input
   - Splits into statements
   - Creates parser instance

2. Precedence levels (highest to lowest):
   - Primary expressions (literals, variables, functions)
   - Unary operations (!, -)
   - Multiplicative (*, /)
   - Additive (+, -)
   - Comparison (<, >, <=, >=)
   - Equality (==, !=)
   - Logical AND (&&)
   - Logical OR (||)
   - Conditional (? :)
   - Assignment (=)

3. Node types produced:
   - Literal (numbers)
   - StringLiteral (strings)
   - Variable (with scopes: temp, variable, context, array)
   - FunctionCall (with namespaces: math, query)
   - UnaryOperation
   - BinaryOperation
   - Conditional
   - Assignment

Each parsing function follows the precedence rules and delegates to the next higher precedence level when needed.
