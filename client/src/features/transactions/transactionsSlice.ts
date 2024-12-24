import { Transaction } from "@/@types/Types";
import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface InitialState {
  allTransactions: {
    data: { [page: number]: Transaction[] };
    status: "idle" | "loading" | "error" | "success";
    totalTransactions: number;
    error: string | null;
    pagination: {
      currentPage: number;
      pageSize: number;
      totalPages: number;
    };
    loadedPages: number[];
  };
  filteredTransactions: {
    data: Transaction[];
    status: "idle" | "loading" | "error" | "success";
    error: string | null;
    filterCriteria: {
      transactionType?: string;
      fromDate?: string;
      toDate?: string;
    };
  };
  recentTransactions: {
    data: Transaction[];
    status: "idle" | "loading" | "error" | "success";
  };
  mostExpenses: {
    data: Transaction[];
    status: "idle" | "loading" | "error" | "success";
    error: string | null;
  };
}

const initialState: InitialState = {
  allTransactions: {
    data: {},
    status: "idle",
    totalTransactions: 0,
    error: null,
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalPages: 0,
    },
    loadedPages: [],
  },
  filteredTransactions: {
    data: [],
    status: "idle",
    error: null,
    filterCriteria: {},
  },
  recentTransactions: {
    data: [],
    status: "idle",
  },
  mostExpenses: {
    data: [],
    status: "idle",
    error: null,
  },
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setGetAllTransactionsStart: (state) => {
      state.allTransactions.status = "loading";
      state.allTransactions.error = null;
      state.recentTransactions.status = "loading";
    },
    setGetAllTransactionsSuccess: (
      state,
      action: PayloadAction<{
        transactions: Transaction[];
        totalTransactions: number;
        page: number;
        pageSize: number;
      }>
    ) => {
      const { totalTransactions, transactions, page, pageSize } =
        action.payload;

      //format
      const formatedTransactions = transactions.map((transaction) => ({
        ...transaction,
        date: dayjs(transaction.createdAt).format("YYYY-MM-DD"),
      }));
      //remove createdAt
      formatedTransactions.forEach(
        (transaction) => delete transaction.createdAt
      );

      state.recentTransactions.data = formatedTransactions.slice(0, 3);

      state.allTransactions.data[page] = formatedTransactions;
      state.allTransactions.status = "success";
      state.recentTransactions.status = "success";
      state.allTransactions.error = null;
      state.allTransactions.totalTransactions = totalTransactions;

      // update pagination info
      state.allTransactions.pagination.currentPage = page;
      state.allTransactions.pagination.pageSize = pageSize;
      state.allTransactions.pagination.totalPages = Math.ceil(
        action.payload.totalTransactions / action.payload.pageSize
      );

      if (!state.allTransactions.loadedPages.includes(page)) {
        state.allTransactions.loadedPages.push(page);
      }
    },
    setGetAllTransasctionsError: (state, action: PayloadAction<string>) => {
      state.allTransactions.status = "error";
      state.allTransactions.error = action.payload;
      state.recentTransactions.status = "error";
    },
    setGetFilteredTransactionsStart: (state) => {
      state.filteredTransactions.error = null;
      state.filteredTransactions.status = "loading";
    },
    setGetFilteredTransactionsSuccess: (
      state,
      action: PayloadAction<{
        filteredTransactions: Transaction[];
        filterCriteria: {
          transactionType?: string;
          fromDate?: string;
          toDate?: string;
        };
      }>
    ) => {
      const formatedTransactions = action.payload.filteredTransactions.map(
        (transaction) => ({
          ...transaction,
          date: dayjs(transaction.createdAt).format("YYYY-MM-DD"),
        })
      );

      formatedTransactions.forEach(
        (transaction) => delete transaction.createdAt
      );

      state.filteredTransactions.data = formatedTransactions;
      state.filteredTransactions.filterCriteria = action.payload.filterCriteria;
      state.filteredTransactions.error = null;
      state.filteredTransactions.status = "success";
    },
    setGetFilteredTransactionsError: (state, action: PayloadAction<string>) => {
      state.filteredTransactions.status = "error";
      state.filteredTransactions.error = action.payload;
    },
    setGetMostExpenseStart: (state) => {
      state.mostExpenses.error = null;
      state.mostExpenses.status = "loading";
    },
    setGetMostExpenseSuccess: (state, action: PayloadAction<Transaction[]>) => {
      state.mostExpenses.data = action.payload;
      state.mostExpenses.error = null;
      state.mostExpenses.status = "success";
    },
    setGetMostExpenseError: (state, action: PayloadAction<string>) => {
      state.mostExpenses.error = action.payload;
      state.mostExpenses.status = "error";
    },
  },
});

export const {
  setGetAllTransactionsStart,
  setGetAllTransactionsSuccess,
  setGetAllTransasctionsError,
  setGetFilteredTransactionsStart,
  setGetFilteredTransactionsSuccess,
  setGetFilteredTransactionsError,
  setGetMostExpenseStart,
  setGetMostExpenseSuccess,
  setGetMostExpenseError,
} = transactionSlice.actions;

export default transactionSlice.reducer;

// selectors
export const selectAllTransactions = (state: RootState) => {
  return state.transactions.allTransactions;
};

export const selectFilteredTransactions = (state: RootState) => {
  return state.transactions.filteredTransactions;
};

export const selectRecentTransaction = (state: RootState) => {
  return state.transactions.recentTransactions;
};

export const selectExpenseTransactions = (state: RootState) => {
  return state.transactions.mostExpenses;
};
