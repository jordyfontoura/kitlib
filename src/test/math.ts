const originals: Record<string, any> = {};

export function mockRandom(fn = () => 0) {
  if (originals.random) return;
  originals.random = Math.random;
  Math.random = jest.fn(fn);
}
export function unmockRandom() {
  if (!originals.random) return;
  const original = originals.random;
  Math.random = original;
  delete originals.random;
}
