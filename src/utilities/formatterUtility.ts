export const convertNairaToDollar = (
  naira: string | number,
  rate = 1132.31,
) => {
  const amount = Number(naira);

  if (isNaN(amount)) return 0;

  return +(amount / rate).toFixed(2);
};
export function getAltPrice(price: number): number {
  const priceMap: Record<number, number> = {
    220800: 200000,
    1104000: 840000,
    2208000: 1672000,
    975: 600,
    1950: 1200,
  };

  return priceMap[price] ?? price;
}
