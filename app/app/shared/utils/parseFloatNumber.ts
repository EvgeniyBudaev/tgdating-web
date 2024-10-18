export const parseFloatNumber = (value: number | string) => {
  return parseFloat(value.toString().replace(",", "."));
};
