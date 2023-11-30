export async function paginate<T>(
  fn: (
    page: number
  ) => { page: T; next: boolean } | Promise<{ page: T; next: boolean }>
): Promise<T[]> {
  let page = 1;
  const pages = [];
  while (true) {
    const result = await fn(page);
    pages.push(result.page);
    if (!result.next) break;
    page++;
  }
  return pages;
}
