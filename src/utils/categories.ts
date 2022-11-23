import { categories } from "../constants/categories";

export function getCategoryColor(categoryTitle: string) {
  const categoryColor = categories.find(
    (c) => c.title === categoryTitle
  )?.color;

  return categoryColor ?? "emerald.700";
}

export function getCategoryIcon(categoryTitle: string) {
  const categoryIcon = categories.find((c) => c.title === categoryTitle)?.icon;

  return categoryIcon ?? "help";
}
