export const removeCurrencyUnit = (
  currencyUnit: string,
  price: string,
): string => price.replace(new RegExp("\\" + currencyUnit + "|,", "g"), "");
