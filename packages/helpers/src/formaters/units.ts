type IUnit = {
  symbol: string;
  value: number;
  decimal?: number;
};

const TimeUnits = [
  { symbol: "ns", value: 1e-9 },
  { symbol: "μs", value: 1e-6 },
  { symbol: "ms", value: 1e-3 },
  { symbol: "s", value: 1 },
  { symbol: "min", value: 60 },
  { symbol: "h", value: 3600 },
  { symbol: "d", value: 86400 },
  { symbol: "mo", value: 2592000 },
  { symbol: "y", value: 31536000 },
  { symbol: "decade", value: 315360000 },
  { symbol: "century", value: 3153600000 },
  { symbol: "millennium", value: 3153600000000 },
];

const MassUnits = [
  { symbol: "mg", value: 1e-3 },
  { symbol: "g", value: 1 },
  { symbol: "kg", value: 1000 },
  { symbol: "t", value: 1000000 },
];

const LengthUnits = [
  { symbol: "nm", value: 0.000001 },
  { symbol: "mm", value: 0.001 },
  { symbol: "cm", value: 0.01 },
  { symbol: "m", value: 1 },
  { symbol: "km", value: 1000 },
];

const AreaUnits = [
  { symbol: "nm²", value: 0.000000001 },
  { symbol: "mm²", value: 0.000001 },
  { symbol: "cm²", value: 0.0001 },
  { symbol: "m²", value: 1 },
  { symbol: "km²", value: 1e6 },
];

export function units(
  num: number,
  unit: "time" | "length" | "area" | "mass",
  options?: {
    fall?: boolean;
    fallThreshold?: number;
    maxFall?: number;
    separator?: string;
  }
) {
  const fall = options?.fall ?? false;
  const fallThreshold = options?.fallThreshold ?? 0;
  const maxFall = options?.maxFall ?? 2;
  const separator = options?.separator ?? " ";

  let usedUnit: IUnit[];
  switch (unit) {
    case "time":
      usedUnit = TimeUnits;
      break;
    case "length":
      usedUnit = LengthUnits;
      break;
    case "area":
      usedUnit = AreaUnits;
      break;
    case "mass":
      usedUnit = MassUnits;
      break;
    default:
      throw new Error("Unknown unit type");
  }
  usedUnit = usedUnit.sort((a, b) => a.value - b.value);
  let index = 0;
  for (let i = 0; i < usedUnit.length; i++) {
    if (num >= usedUnit[i].value) {
      index = i;
    } else {
      break;
    }
  }

  let target = usedUnit[index];
  let current = num;
  let results: { unit: any; value: number }[] = [
    {
      unit: target,
      value: Math.floor(current / target.value),
    },
  ];
  if (fall) {
    let fallCount = 0;
    for (let i = index - 1; i >= 0; i--) {
      if (fallCount >= maxFall) break;
      const child = usedUnit[i];
      const value = current - Math.floor(current / target.value) * target.value;
      if (value / target.value < fallThreshold) break;
      results.push({
        unit: child,
        value: Math.floor(value / child.value),
      });

      current = value;
      target = child;
      fallCount++;
    }
  }
  return results
    .map((item) => {
      return `${item.value}${separator}${item.unit.symbol}`;
    })
    .join(" ");
}

// export function units(
//   n: number,
//   unities: IUnit[] | "time" | "length" | "area" | "mass",
//   options?: {
//     decimal?: number;
//     enforce?: boolean;
//     fall?: number;
//     fallPercent?: number;
//   }
// ): string {
//   if (typeof unities === "string") {
//     switch (unities) {
//       case "time":
//         unities = TimeUnits;
//         break;
//       case "length":
//         unities = LengthUnits;
//         break;
//       case "area":
//         unities = AreaUnits;
//         break;
//       case "mass":
//         unities = MassUnits;
//         break;
//       default:
//         throw new Error("Unknown unit type");
//     }
//   }
//   const sortedUnities = unities.sort((a, b) => a.value - b.value);
//   let index = 0;
//   for (let i = 1; i < sortedUnities.length; i++) {
//     if (n >= sortedUnities[i].value) {
//       index = i;
//     } else {
//       break;
//     }
//   }
//   let value = n;
//   let results: IUnit[] = [];
//   if (index > 0 && (options?.fall || 0) > 0) {
//     for (let i = 0, len = Math.min(options?.fall || 0, index); i < len; i++) {
//       const target = sortedUnities[index - i];
//       const fallTarget = sortedUnities[index - i - 1];
//       const resto = ((value / target.value) % fallTarget.value) * target.value;
//       if (value - resto < target.value * 0.1) {
//         break;
//       }
//       results.push({ ...target, value: value - resto });
//       value = resto;
//     }
//   } else {
//     results.push({
//       ...sortedUnities[index],
//       value: value / sortedUnities[index].value,
//     });
//   }

//   return results
//     .map((item) => {
//       if (options && options.decimal !== undefined && options.enforce) {
//         return `${item.value.toFixed(options.decimal)} ${item.symbol}`;
//       }
//       if (item.decimal !== undefined) {
//         return `${item.value.toFixed(item.decimal)} ${item.symbol}`;
//       }
//       if (options && options.decimal !== undefined) {
//         return `${item.value.toFixed(options.decimal)} ${item.symbol}`;
//       }
//       return `${item.value} ${item.symbol}`;
//     })
//     .join(" ");
// }
