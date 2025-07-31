import { Node, Syntax } from "../molang/syntax/node";

// stateDiagram-v2
//         [*] --> Still
//         Still --> [*]
//         Still --> Moving
//         Moving --> Still
//         Moving --> Crash
//         Crash --> [*]

export function syntaxToStageDiagram(code: Syntax): string {
  let gid = 0;
  function getId() {
    return gid++;
  }

  const lines: string[] = [`[*] --> t0`];

  function syntaxToState(code: Syntax): number {
    const rootId = getId();
    switch (code.type) {
      case Node.function:
        lines.push(bType(rootId, code));
        const identifier = syntaxToState(code.identifier);
        const fparameters = code.parameters.map(syntaxToState);
        lines.push(link(rootId, identifier));
        fparameters.forEach((i) => lines.push(link(rootId, i)));

        break;
      case Node.access:
        lines.push(item(rootId, code.accessor.text), bType(rootId, code));
        const base = syntaxToState(code.base);
        const property = syntaxToState(code.property);
        lines.push(link(rootId, base), link(base, property));
        break;
      case Node.assignment:
        lines.push(item(rootId, "="), bType(rootId, code));
        const receiver = syntaxToState(code.receiver);
        const value = syntaxToState(code.value);
        lines.push(link(value, rootId), link(rootId, receiver));
        break;
      case Node.compare:
        lines.push(item(rootId, code.operator.text), bType(rootId, code));
        const a = syntaxToState(code.a);
        const b = syntaxToState(code.b);
        lines.push(link(rootId, a), link(rootId, b));
        break;
      case Node.identifier:
      case Node.unknown:
      case Node.constant:
        lines.push(item(rootId, code.base.text), bType(rootId, code));
        break;
      case Node.operation:
        lines.push(item(rootId, code.operation.text), bType(rootId, code));
        const parameters = code.parameters.map(syntaxToState);
        parameters.forEach((i) => lines.push(link(rootId, i)));
        break;
    }

    return rootId;
  }

  syntaxToState(code);

  return `stateDiagram-v2\n${lines
    .filter((item) => !item.endsWith(": unknown"))
    .map((item) => `    ${item}`)
    .join("\n")}`;
}

function item(id: number, text: string) {
  return `t${id}: ${text}` as const;
}
function bType(id: number, code: Syntax) {
  return `t${id}: ${Node[code.type]}` as const;
}

function link(fromId: number, toId: number) {
  return `t${fromId} --> t${toId}` as const;
}
