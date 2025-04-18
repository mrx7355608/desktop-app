export function formatLocalPKPhone(number: string) {
  const cleaned = number.replace(/\D/g, ""); // remove non-digits
  if (cleaned.length !== 11 || !cleaned.startsWith("03"))
    return "Invalid number";

  return cleaned.replace(/(\d{4})(\d{7})/, "$1-$2");
}
