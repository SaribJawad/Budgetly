import { User } from "@/@types/User";
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
  state.auth.user;
};
export const selectAuthLoading = (state: RootState) => {
  state.auth.loading;
};
export const selectAuthenticationState = (state: RootState) => {
  return state.auth.isAuthenticated;
};
