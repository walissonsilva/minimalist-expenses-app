import { format } from "date-fns";

export function formatDate(date: Date) {
  return format(date, "dd/MM/yyyy");
}

export function getMonthName(date: string | Date): string {
  if (typeof date === "string") {
    return format(new Date(date), "LLLL");
  }

  return format(date, "LLLL");
}

export function getYear(date: string): number {
  return Number(format(new Date(date), "yyyy"));
}
