export const categories: string[] = [
  "Others",
  "Food & Drinks",
  "Shopping",
  "Housing",
  "Transporation",
  "Vehicle",
  "Life & Entertainment",
  "Communication, PC",
  "Financial expenses",
  "Investments",
  "Income",
];

interface TransactionsType {
  INCOME: "Income";
  EXPENSE: "Expense";
  TRANSFER: "Transfer";
}

export const transactionsType: TransactionsType = {
  INCOME: "Income",
  EXPENSE: "Expense",
  TRANSFER: "Transfer",
};

export const paymentTypes: string[] = [
  "Cash",
  "Debit card",
  "Credit card",
  "Bank transfer",
  "Voucher",
  "Mobile payment",
  "Web payment",
];

export const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
