import * as constants from "../constants";

describe("NestJS Objection constants", () => {
  test("has 3", () => {
    const expected = 3;

    expect(Object.keys(constants)).toHaveLength(expected);
  });
});
