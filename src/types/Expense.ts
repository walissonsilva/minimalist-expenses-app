export interface IExpense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  month: string;
  year: number;
  type?: "fixed" | "installments";
  expiration?: Date;
}
