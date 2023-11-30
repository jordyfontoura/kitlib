import * as vec from "./vec2";

describe("vec2", () => {
  test("add", () => {
    let u = vec.create(1, 2);
    let v = vec.create(3, 4);

    let w = vec.add(u, v);

    expect(w.x).toBe(4);
    expect(w.y).toBe(6);
  });
});
