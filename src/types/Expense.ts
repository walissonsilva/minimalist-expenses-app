export interface IExpense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type?: "fixed" | "installments";
  expiration?: Date;
}
