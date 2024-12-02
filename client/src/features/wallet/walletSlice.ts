import { Wallet } from "@/@types/Types";
import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  allWallets: {
    data: Wallet[];
    status: "idle" | "loading" | "error" | "success";
    error: string | null;
  };
}

const initialState: InitialState = {
  allWallets: {
    data: [],
    status: "idle",
    error: null,
  },
};

const walletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    setGetAllWalletsStart: (state) => {
      state.allWallets.error = null;
      state.allWallets.status = "loading";
    },
    setGetAllWalletsSuccess: (state, action: PayloadAction<Wallet[]>) => {
      state.allWallets.status = "success";
      state.allWallets.error = null;
      state.allWallets.data = action.payload;
    },
    setGetAllWalletsError: (state, action: PayloadAction<string>) => {
      state.allWallets.error = action.payload;
      state.allWallets.status = "error";
    },
  },
});

export const {
  setGetAllWalletsStart,
  setGetAllWalletsSuccess,
  setGetAllWalletsError,
} = walletSlice.actions;

export default walletSlice.reducer;

// selectors

export const selectAllWallets = (state: RootState) => {
  return state.wallet.allWallets;
};
