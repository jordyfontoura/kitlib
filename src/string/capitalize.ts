export function capitalize(str: string): string {
  return str
    .split(' ')
    .map((group) => group.charAt(0).toUpperCase() + group.slice(1))
    .join(' ');
}
export default capitalize;
