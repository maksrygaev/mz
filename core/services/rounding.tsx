export const priceRounding = (value: any) => {
  if (value.match(/\.(\d+)/)?.[1].length >= 4) return Number(value).toFixed(4);
  return value;
};
