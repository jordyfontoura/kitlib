const originals: Record<string, any> = {};

export class Timers {
  static mockSetTimeout(fn = (func: any, delta: any) => func(delta)) {
    mockGlobalFunction('setTimeout', fn);
  }
  static unmockSetTimeout() {
    unmockGlobalFunction('setTimeout');
  }
}

export function mockGlobalFunction(name: keyof typeof global, fn?: any) {
  if (originals[name]) return (global as any)[name];

  const original = (global as any)[name];
  originals[name] = original;
  (global as any)[name] = jest.fn(fn);

  return original;
}
export function unmockGlobalFunction(name: keyof typeof global) {
  if (!originals[name]) return;
  const original = originals[name];
  (global as any)[name] = original;
  delete originals[name];
}

export function flushPromises() {
  return new Promise(setImmediate);
}
