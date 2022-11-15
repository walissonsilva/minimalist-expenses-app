export interface IExpense {
  description: string;
  amount: number;
  category: string;
  date: Date;
  expiration?: Date;
}
