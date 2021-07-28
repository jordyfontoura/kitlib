import { transform } from "./transform";

class E {
  @transform(Math.floor)
  id: number = -17;
}

describe('Transform', () => {
  test('Transform', () => {
    const a = new E();
    expect(a.id).toBe(-17);
    a.id = 0.8;
    expect(a.id).toBe(0);
    a.id = 53.253457;
    expect(a.id).toBe(53);
  });
});
