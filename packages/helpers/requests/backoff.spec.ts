import { mockRandom, unmockRandom } from '../../../tests/math';
import { flushPromises, Timers } from '../../../tests/promises';
import { backoff, exponentialBackoff } from './backoff';

describe('Backoff', () => {
  beforeEach(() => {
    Timers.mockSetTimeout();
  });
  afterEach(() => {
    jest.useRealTimers();
    Timers.unmockSetTimeout();
    unmockRandom();
  });
  it('Deve validar a função backoff', async () => {
    function errorWithCalled(times: number) {
      return jest.fn(async (attempt: number) => {
        if (attempt < times) {
          throw new Error();
        }
        return true;
      });
    }

    for (let i = 1; i <= 20; i++) {
      const fn = errorWithCalled(i);

      expect(fn).toHaveBeenCalledTimes(0);
      backoff(fn, 100, 17);

      await flushPromises();

      expect(fn).toHaveBeenCalledTimes(i + 1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 17);
    }
  });

  it('Deve validar a função exponentialBackoff', async () => {
    Timers.mockSetTimeout();
    mockRandom();
    function errorWithCalled(times: number) {
      return jest.fn(async (attempt: number) => {
        if (attempt < times) {
          throw new Error();
        }
        return true;
      });
    }

    for (let i = 1; i <= 20; i++) {
      const fn = errorWithCalled(i);

      expect(fn).toHaveBeenCalledTimes(0);
      exponentialBackoff(fn, 100);

      await flushPromises();

      expect(fn).toHaveBeenCalledTimes(i + 1);
      expect(setTimeout).toHaveBeenCalledWith(
        expect.any(Function),
        Math.min(1000 * (2 ** i + Math.random()), 64000)
      );
    }
  });
});
