const formatNumber = (value) => new Intl.NumberFormat("es-AR").format(value);
const formatPercentage = (value) =>
  new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: value >= 99.5 ? 0 : 1,
    minimumFractionDigits: value >= 99.5 ? 0 : 1,
  }).format(value);

export { formatNumber, formatPercentage };
