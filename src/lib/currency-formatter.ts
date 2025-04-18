export function formatPKR(amount: number) {
  return new Intl.NumberFormat("en-PK").format(amount);
}
