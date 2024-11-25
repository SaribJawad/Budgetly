import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import analyticReducer from "@/features/analytics/analyticSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    analytic: analyticReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
