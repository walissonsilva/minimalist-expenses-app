import { isBefore } from "date-fns";
import { IExpense } from "../types/Expense";
import { getMonthName } from "./date";

export function filterExpensesByMonth(
  expenses: IExpense[],
  date: Date
): IExpense[] {
  const monthName = getMonthName(date);

  return expenses.filter(
    (expense) =>
      expense.month === monthName ||
      (expense.type === "fixed" && isBefore(new Date(expense.date), date))
  );
}
