export function backoff<T>(
  fn: (attempt: number, err?: any) => Promise<T>,
  maxRetries: number = 10,
  delay: number = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempt = 0;
    function tryAgain(err: any) {
      attempt++;
      if (attempt >= maxRetries) {
        return reject(err);
      }
      setTimeout(() => {
        fn(attempt, err).then(resolve).catch(tryAgain);
      }, delay * attempt);
    }
    fn(attempt).then(resolve).catch(tryAgain);
  });
}
export function exponentialBackoff<T>(
  fn: (attempt: number, err?: any) => Promise<T>,
  maxRetries: number = 10,
  maximumBackoff: number = 64000
): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempt = 0;
    function tryAgain(err: any) {
      attempt++;
      if (attempt >= maxRetries) {
        return reject(err);
      }
      setTimeout(() => {
        fn(attempt, err).then(resolve).catch(tryAgain);
      }, Math.min(1000 * (2 ** attempt + Math.random()), maximumBackoff));
    }
    fn(attempt).then(resolve).catch(tryAgain);
  });
}
