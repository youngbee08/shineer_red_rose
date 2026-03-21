export const convertNairaToDollar = (naira: string | number, rate = 1132) => {
  const amount = Number(naira);

  if (isNaN(amount)) return 0;

  return +(amount / rate).toFixed(2);
};
