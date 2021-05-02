import { fail } from "assert";
import { assert } from "console";
import { molang } from "../../src/molang/molang";

/** */
suite("molang", () => {
  /** */
  test("get variables", () => {
    const Data = "variable.hand_bob = v.sample + ((math.clamp(math.sqrt(math.pow(math.pow(V.temp, 2.0)), 0.0, 0.1) : 0.0) - variable.foot_Bob) * 0.02;";

    const variables_used = ["hand_bob", "sample", "temp", "foot_Bob"];
    let variable_mark = [false, false, false, false];

    let variables = molang.getVariablesUsed(Data);

    for (let I = 0; I < variables.length; I++) {
      const element = variables[I];

      let index = variables_used.indexOf(element);
      if (index < 0) {
        fail("unknown variable found: " + element);
      } else {
        variable_mark[index] = true;
      }
    }

    let index = variable_mark.indexOf(false);
    if (index > -1) {
      fail("variable not found: " + variables_used[index]);
    }
  });

  /** */
  test("get defined variable", () => {
    const Data = "variable.hand_bob = v.sample + ((math.clamp(math.sqrt(math.pow(math.pow(V.temp, 2.0)), 0.0, 0.1) : 0.0) - variable.foot_Bob) * 0.02;";
    const Defined = "hand_bob";

    let find = molang.getVariableDefined(Data);

    assert(find === Defined);
  });
});
