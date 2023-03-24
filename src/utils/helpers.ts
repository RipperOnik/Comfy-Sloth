import { Product } from "./../context/products_context";
export const formatPrice = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (data: any[], type: string): string[] => {
  let uniqueItems = data.map((item) => item[type]);

  if (uniqueItems.some((item) => Array.isArray(item))) {
    uniqueItems = uniqueItems.flat();
  }
  const set = new Set(uniqueItems);

  return ["all", ...Array.from(set)];
};
