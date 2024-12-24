import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import analyticReducer from "@/features/analytics/analyticSlice";
import transactionsReducer from "@/features/transactions/transactionsSlice";
import walletReducer from "@/features/wallet/walletSlice";
import goalReducer from "../features/goal/goalSlice";
import budgetReducer from "@/features/budget/budgetSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    analytic: analyticReducer,
    transactions: transactionsReducer,
    wallet: walletReducer,
    goal: goalReducer,
    budget: budgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
