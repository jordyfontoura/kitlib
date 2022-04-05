export function clock() {
  let mark: number = -1;
  let elapsedTime: number = 0;

  function stop() {
    if (mark === -1) {
      return;
    }
    const now = performance.now();
    elapsedTime = now - mark;
    mark = -1;
  }
  function run() {
    if (mark !== -1) {
      return;
    }
    mark = performance.now();
  }
  function reset() {
    mark = -1;
    elapsedTime = 0;
  }
  function elapsed() {
    if (mark === -1) {
      return elapsedTime;
    }
    const now = performance.now();
    return now - mark + elapsedTime;
  }

  return {
    stop,
    run,
    reset,
    elapsed,
  };
}
