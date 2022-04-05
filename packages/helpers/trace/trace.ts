export function callsite(): NodeJS.CallSite[] {
  const orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function (_, stack) {
    return stack;
  };
  const err = new Error();
  Error.captureStackTrace(err, callsite);
  const stack = (err as any).stack as NodeJS.CallSite[];
  Error.prepareStackTrace = orig;
  return stack;
}
