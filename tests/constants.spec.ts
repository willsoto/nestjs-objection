import * as constants from "@/constants";

describe("Constants", () => {
  test("has 3", () => {
    const expected = 3;

    expect(Object.keys(constants)).toHaveLength(expected);
  });
});
