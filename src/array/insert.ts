type InsertInfo<T> = {
  next: number;
  elements: T[];
  break?: boolean;
};
export function insert<T>(
  array: T[],
  generate: (
    this: T[],
    index: number,
    count: number,
    lastInsert: InsertInfo<T> | undefined,
    inserts: InsertInfo<T>[]
  ) => InsertInfo<T>,
  start?: number
): void {
  const inserts: InsertInfo<T>[] = [];
  let index = start || 0;
  let count = 0;
  let lastInsert: InsertInfo<T> | undefined;
  while (index < array.length) {
    const insert = generate.call(array, index, count++, lastInsert, inserts);
    if (insert.break) break;

    inserts.push(insert);
    index = insert.next;
    lastInsert = insert;
    array.splice(index, 0, ...insert.elements);
  }
}
// export function insert<T>(
//   array: T[],
//   element: (
//     this: T[],
//     index: number,
//     lastElement: T | undefined,
//     inserts: T[]
//   ) => T,
//   next: (this: T[]) => boolean | number
// ): boolean;
// export function insert<T>(array: T[], index: number, ...items: T[]): boolean;
// export function insert<T>(array: T[], index: number, ...items: T[]): boolean;
// export function insert<T>(array: T[], item: T, index: number): boolean;

// export function insert<T>(array: T[], item: T, index: number): boolean {
//   array.splice(index, 0, item);
//   return true;
// }
