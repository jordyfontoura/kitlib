import { callsite } from './trace';

describe('trace', () => {
  it('Deve validar o trace', function it() {
    const stacks = callsite();
    expect(stacks).toBeDefined();
    expect(stacks.length).toBeGreaterThan(0);

    const stack = stacks[0];
    const [fileName, line, functionName] = [
      stack.getFileName().split('/').pop(),
      stack.getLineNumber(),
      stack.getFunctionName(),
    ];
    expect(fileName).toBe('trace.spec.ts');
    expect(line).toBe(6);
    expect(functionName).toBe('it');
  });
});
