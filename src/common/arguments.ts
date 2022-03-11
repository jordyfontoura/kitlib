export type CommandArguments = Record<
  string | number,
  // string | boolean | number | null
  any
>;

type Primitive = string | number | boolean | null;

function parseValue(value: string): Primitive | Primitive[] {
  if (value === "") {
    return null;
  }
  if (!isNaN(value as any)) {
    return parseFloat(value);
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (value.includes(",")) {
    return value.split(",").map(parseValue) as Primitive[];
  }
  return value;
}

export function parseArguments(...args: string[]): CommandArguments {
  let counter = 0;
  return args.reduce((acc, arg) => {
    if (!arg.includes("=")) {
      return { ...acc, [arg]: true, [counter++]: arg };
    }
    const [key, value] = arg.split("=");

    return { ...acc, [key]: parseValue(value), [counter++]: arg };
  }, {} as CommandArguments);
}