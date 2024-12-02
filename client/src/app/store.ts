import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import analyticReducer from "@/features/analytics/analyticSlice";
import transactionsReducer from "@/features/transactions/transactionsSlice";
import walletReducer from "@/features/wallet/walletSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    analytic: analyticReducer,
    transactions: transactionsReducer,
    wallet: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
