export const formatMoney = cantidad => {
  return Number(cantidad).toLocaleString('en-US', {
    style: 'currency',
    currency: 'Lps',
  });
};
