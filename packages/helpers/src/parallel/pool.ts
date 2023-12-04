export interface IParallelPoolOptions {
  /**
   * Maximum number of concurrent tasks
   */
  concurrency: number;
  /**
   * Maximum number of retries
   */
  maxRetries?: number;
  /**
   * Delay between retries
   */
  retryDelay?: number;
}

export interface IParallelTaskReport {
  /**
   * Name of the function that threw the error
   */
  function: string;
  /**
   * Arguments passed to the task
   */
  arguments: any[];
  /**
   * Error thrown by the task
   */
  error: any;
  /**
   * Timestamp when the error was thrown
   */
  at: number;
}



/**
 * Creates a pool of parallel tasks with a maximum concurrency
 * @param parallelFunction Function to run in parallel
 * @param options Pool options
 * @returns Pool object
 * @example
 * async function isPrime(n: number) {
 *   if (n < 2) return;
 *   for (let i = 2; i <= Math.sqrt(n); i++) {
 *     if (n % i === 0) return;
 *   }
 *   
 *   console.log(`${n} is prime`);
 * }
 * const pool = useParallelPool(isPrime, { concurrency: 5, maxRetries: 3 });
 * 
 * for (let i = 1_000_000_000; i < 1_000_001_000; i++) {
 *   await pool.enqueue(i);
 * }
 * 
 * await pool.drain();
 */
export function useParallelPool<TFn extends (...args: any) => Promise<any>>(
  parallelFunction: TFn,
  options: IParallelPoolOptions
) {
  const { concurrency, maxRetries, retryDelay } = {
    maxRetries: 1,
    ...options,
  };

  let pool: Set<Promise<any>> = new Set();
  /**
   * Reports of failed tasks
   */
  const reports: IParallelTaskReport[] = [];

  const self = {
    create: useParallelPool,
    enqueue,
    drain,
    reports,
  };

  return self;

  async function queue(...args: Parameters<TFn>) {
    let attempt = 0;

    let promise = run();

    pool.add(promise);

    async function run() {
      let error = null;
      let at = 0;
      while (attempt < maxRetries) {
        try {
          const result = await parallelFunction(...(args as any));
          pool.delete(promise);

          if (result && "reports" in result && Array.isArray(result.reports) && result.reports.length > 0) {
            reports.push({
              function: parallelFunction.name,
              arguments: args,
              error: result.reports,
              at: Date.now(),
            });
          }
          return;
        } catch (e) {
          error = e;
          attempt++;
          at = Date.now();

          if (attempt < maxRetries && retryDelay) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          }
        }
      }

      reports.push({
        function: parallelFunction.name,
        arguments: args,
        error,
        at,
      });
      pool.delete(promise);
    }
  }

  /**
   * Enqueues a task to run in parallel. If the pool is full, it will wait for a slot to be available
   * @param args Arguments to pass to the parallel function
   */
  async function enqueue(...args: Parameters<TFn>) {
    if (pool.size >= concurrency) {
      await Promise.race(pool);
    }

    queue(...args);
  }

  /**
   * Waits for all tasks to finish
   * @returns Promise that resolves when all tasks are finished
   */
  async function drain() {
    await Promise.all(pool);

    return self;
  }
}
