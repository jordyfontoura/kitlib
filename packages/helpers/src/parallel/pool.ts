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
 * const pool = useParallelPool(async () => {
 *   return await new Promise((resolve) => setTimeout(()=>{
 *     console.log("Task done");
 *     resolve();
 *   }, 1000));
 *  }, { concurrency: 5, maxRetries: 3 });
 * 
 * for (let i = 0; i < 6; i++) {
 *   await pool.enqueue();
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

  return {
    enqueue,
    drain,
    reports,
  };

  async function queue(...args: Parameters<TFn>) {
    let attempt = 0;

    let promise = run();

    pool.add(promise);

    async function run() {
      let error = null;
      let at = 0;
      while (attempt < maxRetries) {
        try {
          await parallelFunction(...(args as any));
          pool.delete(promise);
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
  }
}
