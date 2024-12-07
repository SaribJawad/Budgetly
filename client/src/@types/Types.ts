export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  walletCreatedOnce: boolean;
}

export interface Wallet {
  walletName: string;
  type: string;
  balance: number;
  walletOwner: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinanceSummary {
  title: string;
  amount: number;
  percentageChange?: number;
}

export interface MonthlyFlow {
  month: number;
  income: number;
  expense: number;
}

export interface Transaction {
  _id: string;
  user: string;
  amount: number;
  category: string;
  transactionType: string;
  fromWallet: string;
  paymentType: string;
  createdAt?: string;
  updatedAt: string;
  date: string;
}

export interface Goal {
  _id: string;
  user: string;
  name: string;
  targetAmount: number;
  savedAlready: number;
  goalDeadline: string;
  goalReached: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  _id: string;
  name: string;
  period: string;
  amount: number;
  spentAmount: number;
  category: string;
  walletName: string;
}

export interface YearlyTrend {
  month: number;
  totalIncome: number;
  totalExpense: number;
  savings: number;
}

export interface SavingOverview {
  month: number;
  totalIncome: number;
  totalSavings: number;
}

interface MonthlyBalance {
  month: number;
  totalBalance: number;
}

export interface BalanceOverview {
  currentYearBalance: MonthlyBalance[];
  lastYearBalance: MonthlyBalance[];
}
