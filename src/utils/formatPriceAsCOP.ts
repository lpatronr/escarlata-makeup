function formatPriceAsCOP(price: number): string {
  return new Intl.NumberFormat("es-co", {
    style: "currency",
    currency: "COP",
  }).format(price);
}

export default formatPriceAsCOP;
