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

export const walletTypes: string[] = [
  "General",
  "Cash",
  "Current Account",
  "Credit Card",
  "Saving Account",
  "Bonus",
  "Insurance",
  "Investment",
  "Loan",
  "Mortgage",
  "Account with Overdraft",
];

type currencies = { code: string; name: string };

export const currencies: currencies[] = [
  { code: "USD", name: "United States Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "PKR", name: "Pakistani Rupee" },
];

export const period: string[] = ["All", "Week", "Month", "Year"];
