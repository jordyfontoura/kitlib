export default function wait(ms: number) {
  if (ms <= 0) {
    return;
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}
