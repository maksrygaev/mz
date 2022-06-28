export const getBalanceString = (value: number, minF = 2, maxF = 2): string => {
  if (!value) return '0';
  return value
    .toLocaleString('en-US', {
      minimumFractionDigits: minF,
      maximumFractionDigits: minF > maxF ? minF : maxF,
    })
    .replace(/[^.\d]/g, '');
};