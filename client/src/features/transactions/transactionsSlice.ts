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
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setGetAllTransactionsStart: (state) => {
      state.allTransactions.status = "loading";
      state.allTransactions.error = null;
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

      state.allTransactions.data[page] = formatedTransactions;
      state.allTransactions.status = "success";
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
      state.filteredTransactions.data = action.payload.filteredTransactions;
      state.filteredTransactions.filterCriteria = action.payload.filterCriteria;
      state.filteredTransactions.error = null;
      state.filteredTransactions.status = "success";
    },
    setGetFilteredTransactionsError: (state, action: PayloadAction<string>) => {
      state.filteredTransactions.status = "error";
      state.filteredTransactions.error = action.payload;
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
} = transactionSlice.actions;

export default transactionSlice.reducer;

// selectors
export const selectAllTransactions = (state: RootState) => {
  return state.transactions.allTransactions;
};

export const selectFilteredTransactions = (state: RootState) => {
  return state.transactions.filteredTransactions;
};
