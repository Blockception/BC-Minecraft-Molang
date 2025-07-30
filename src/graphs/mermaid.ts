import { CodeBlock } from "../molang/syntax/lexical/blocks";

// flowchart LR
//     subgraph B1[test]
//         direction LR
//         t1[hello]
//         subgraph t2
//             direction BT
//         end
//         t3[hello]

//         t1 --> t2
//         t2 --> t3
//     end

export function blocksToMermaid(code: CodeBlock): string {
  let gid = 0;
  function getId() {
    return gid++;
  }

  const links: string[] = [];
  const [graph] = codeBlockToString(code);

  function codeBlockToString(block: CodeBlock) {
    const data = concatStringOnly(block.nodes.map((item) => (CodeBlock.isCodeBlock(item) ? item : item.text)));
    const id = getId();
    const ids = [];
    let graph = "";

    for (let i = 0; i < data.length; i++) {
      const n = data[i];
      if (typeof n === "string") {
        const nid = getId();
        ids.push(nid);
        graph += `    T${nid}["${n}"]\n`;
      } else {
        const [g, nid] = codeBlockToString(n);
        graph += '\n' + g;
        ids.push(nid);
      }
    }

    // Generate links for the nodes
    for (let i = 0; i < ids.length - 1; i++) {
      links.push(`T${ids[i]} --> T${ids[i + 1]}`);
    }

    const blockStr = `    subgraph T${id}["block of ${block.surround}"]
    direction LR
${graph}
    end`;

    return [blockStr, id];
  }

  return `flowchart LR\n${graph}\n${links.map((item) => `    ${item}`).join("\n")}`;
}

// Concatenate adjacent string items, but not if there's a CodeBlock between them
function concatStringOnly(items: (string | CodeBlock)[]) {
  const result: (string | CodeBlock)[] = [];
  let currentString = "";

  for (let i = 0; i < items.length; i++) {
    const current = items[i];

    if (typeof current === "string") {
      currentString += current;
    } else {
      // If we have accumulated string content, push it before the CodeBlock
      if (currentString) {
        result.push(currentString);
        currentString = "";
      }
      result.push(current);
    }
  }

  // Don't forget to push the last accumulated string if it exists
  if (currentString) {
    result.push(currentString);
  }

  return result;
}
