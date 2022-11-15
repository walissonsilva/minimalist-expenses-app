export function currencyMask(value?: string): string | undefined {
  if (!value) return value;

  let formatted: string = value;

  if (!value.includes(".")) formatted = (parseFloat(value) / 100).toFixed(2);
  else if (value.includes(".")) {
    const [, decimal] = value.split(".");

    if (decimal.length > 2) {
      formatted = (Number(value) * 10).toFixed(2);
    } else {
      formatted = (Number(value) / 10).toFixed(2);
    }
  }

  return formatted;
}

export function dateMask(value?: string): string | undefined {
  if (!value) return value;

  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1");
}
