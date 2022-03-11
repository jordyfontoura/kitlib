function choiceWithChance<T>(choices: T[], chance: (item: T) => number): T {
  const total = choices.reduce((acc, item) => acc + chance(item), 0);
  const rand = Math.random() * total;
  let sum = 0;
  for (const item of choices) {
    sum += chance(item);
    if (rand < sum) {
      return item;
    }
  }
  return choices[0];
}
function choiceRandom<T>(choices: T[]): T {
  return choices[Math.floor(Math.random() * choices.length)];
}
function choice<T, K>(choices: T[], key: keyof T): T;
function choice<T>(choices: T[], chance: (item: T) => number): T;
function choice<T>(
  choices: T[],
  choiceFunc?: keyof T | ((item: T) => number)
): T {
  if (choiceFunc) {
    return choiceWithChance(
      choices,
      typeof choiceFunc === 'string' ||
        typeof choiceFunc === 'number' ||
        typeof choiceFunc === 'symbol'
        ? (item: T) => (item as any)[choiceFunc]
        : choiceFunc
    );
  } else {
    return choiceRandom(choices);
  }
}
export default choice;
