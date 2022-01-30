export const formatToMoney = (num: number): string =>
  new Intl.NumberFormat('en-US', {
    /*
    These options are needed to round to whole numbers.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  */
    style: 'currency',
    currency: 'USD',
  }).format(num);

export const isNegative = (num: string | number) => Number(num) < 0;
export const isPositive = (num: string | number, includeZero?: boolean) =>
  includeZero ? Number(num) >= 0 : Number(num) > 0;
