import { fail } from "assert";
import { molang } from "../../src/molang/molang";

/** */
suite("molang", () => {
  /** */
  test("get query", () => {
    const Data =
      "variable.hand_bob = q.life_time < 0.01 ? 0.0 : variable.hand_bob + ((query.is_on_ground && query.is_alive ? math.clamp(math.sqrt(math.pow(Q.position_delta(0), 2.0) + math.pow(Query.position_delta(2), 2.0)), 0.0, 0.1) : 0.0) - variable.hand_bob) * 0.02;";

    const queries_used = ["life_time", "is_on_ground", "is_alive", "position_delta"];
    let variable_mark = [false, false, false, false];

    let queries = molang.getQueriesUsed(Data);

    for (let I = 0; I < queries.length; I++) {
      const element = queries[I];

      let index = queries_used.indexOf(element);
      if (index < 0) {
        fail("unknown query found: " + element);
      } else {
        variable_mark[index] = true;
      }
    }

    let index = variable_mark.indexOf(false);
    if (index > -1) {
      fail("query not found: " + queries_used[index]);
    }
  });
});
