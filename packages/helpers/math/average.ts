export function average(valores: number[]): number;
export function average(...valores: number[]): number;
export function average(first: number | number[], ...valores: number[]) {
  if (typeof first === 'number') {
    return valores.sort((a, b) => a - b);
  } else {
    const sortedList = first.sort((a, b) => a - b);
    if (sortedList.length % 2 === 1) {
      return sortedList[(sortedList.length - 1) / 2];
    } else {
      return (
        (sortedList[sortedList.length / 2] -
          sortedList[sortedList.length / 2 - 1]) /
        2
      );
    }
  }
}
