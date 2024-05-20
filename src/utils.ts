export const formatValue = (value: number) => {
  const val = Math.round(value);
  return value === 0 ? "None" : `${val.toLocaleString()}km²`;
};

export const formatPercentage = (value: number) => {
  if (value < 1 && value > 0) return "<1%";
  return value >= 0 ? `${Math.round(value).toLocaleString()}%` : "";
};

export const capitalizeFirstLetter = (value: string) => {
  if (!value) return;
  let newVal = value.toLowerCase().replace(/_/g, " ");

  const firstLetter = newVal.charAt(0).toUpperCase();
  return firstLetter + newVal.slice(1);
};
