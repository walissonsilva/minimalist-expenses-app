export function formatDate(date: Date) {
  return date.toLocaleDateString("pt-br", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
