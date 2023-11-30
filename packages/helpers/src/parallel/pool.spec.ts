import { useParallelPool } from "./pool";

describe("ParallelPool", () => {
  jest.useFakeTimers();
  test("Arguments", async () => {
    const fn = jest.fn();
    const pool = useParallelPool(fn, { concurrency: 5, maxRetries: 3 });

    await pool.enqueue(1, 2);
    await pool.drain();

    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(1, 2);
  });

  test("Max retries", async () => {
    const fn = jest.fn();
    const pool = useParallelPool(fn, { concurrency: 5, maxRetries: 10 });

    fn.mockRejectedValue("error");

    await pool.enqueue();
    await pool.drain();

    expect(fn).toBeCalledTimes(10);

    const report = pool.reports;

    expect(report).toHaveLength(1);
    expect(report[0].error).toBe("error");
  });

  test("Concurrency", async () => {
    const fn = jest.fn();
    const pool = useParallelPool(fn, { concurrency: 5, maxRetries: 3 });

    fn.mockResolvedValue("ok");

    for (let i = 0; i < 6; i++) {
      await pool.enqueue();
    }

    await pool.drain();

    expect(fn).toBeCalledTimes(6);
  });

  test("Retry delay", async () => {
    const fn = jest.fn();
    const pool = useParallelPool(fn, {
      concurrency: 5,
      maxRetries: 3,
      retryDelay: 1000,
    });

    fn.mockRejectedValue("error");

    await pool.enqueue();

    for (let i = 0; i < 2; i++) {
      jest.advanceTimersByTime(1000);
      await jest.runAllTimersAsync();
    }

    expect(fn).toBeCalledTimes(3);

    await pool.drain();
    
    expect(fn).toBeCalledTimes(3);
  });

  test("Reports", async () => {
    const fn = jest.fn();
    const pool = useParallelPool(fn, {
      concurrency: 5,
      maxRetries: 3,
      retryDelay: 1000,
    });

    fn.mockRejectedValue("error");

    await pool.enqueue(1);
    await pool.enqueue(2);
    await pool.enqueue(3);

    for (let i = 0; i < 2; i++) {
      jest.advanceTimersByTime(1000);
      await jest.runAllTimersAsync();
    }

    expect(pool.reports).toHaveLength(3);
    expect(pool.reports[0].arguments).toEqual([1]);
    expect(pool.reports[1].arguments).toEqual([2]);
    expect(pool.reports[2].arguments).toEqual([3]);
  });
});
