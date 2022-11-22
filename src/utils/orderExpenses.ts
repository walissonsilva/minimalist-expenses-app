import { IExpense } from "../types/Expense";

export function orderExpensesByDate(expenses: IExpense[]) {
  return expenses.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}
