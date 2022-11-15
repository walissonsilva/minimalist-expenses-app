export interface IExpense {
  description: string;
  amount: number;
  category: string;
  date: string;
  type?: "fixed" | "installments";
  expiration?: Date;
}
