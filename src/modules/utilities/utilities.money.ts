export function parseMoneyDinero(amount: string) {
  const cleanedValue = amount.replace(/[^0-9.-]+/g, '');
  const parsedValue = parseFloat(cleanedValue);

  if (isNaN(parsedValue)) {
    throw new Error();
  }
  return Math.round(parsedValue * 100);
}

export function parseMoney(amount: string) {
  const cleanedValue = amount.replace(/[^0-9.-]+/g, '');
  const parsedValue = parseFloat(cleanedValue);
  if (isNaN(parsedValue)) {
    throw new Error();
  }
  return parsedValue;
}