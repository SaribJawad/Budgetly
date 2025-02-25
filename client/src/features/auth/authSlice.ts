import { User } from "@/@types/Types";
import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      localStorage.setItem("currency", action.payload.currency);

      state.user = action.payload;
      state.loading = false;
      state.isAuthenticated = !!action.payload;
    },
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, logout, setAuthStatus } =
  authSlice.actions;

export default authSlice.reducer;

// selectors
export const selectUser = (state: RootState) => {
  return state.auth.user;
};
export const selectAuthLoading = (state: RootState) => {
  return state.auth.loading;
};
export const selectAuthenticationState = (state: RootState) => {
  return state.auth.isAuthenticated;
};
export const selectWalletCreatedOnce = (state: RootState) => {
  return state.auth.user?.walletCreatedOnce;
};

export const selectUserCurrency = (state: RootState) => {
  return state.auth.user?.currency;
};
