export const isNegative = (num: string | number) => Number(num) < 0;
export const isPositive = (num: string | number, includeZero?: boolean) =>
  includeZero ? Number(num) >= 0 : Number(num) > 0;
