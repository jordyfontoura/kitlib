export function count(text: string, pattern: string | RegExp): number {
  if (typeof pattern === 'string') {
    return Math.max((text.split(pattern) || []).length - 1, 0);
  }
  return (text.match(new RegExp(pattern.source, 'g')) || []).length;
}

export default count;
