import { FinanceSummary } from "@/@types/Types";
import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  financeSummary: FinanceSummary[] | null;
}

const initialState: InitialState = {
  financeSummary: null,
};

const analyticSlice = createSlice({
  name: "analytic",
  initialState,
  reducers: {
    setFinanceSummary: (state, action: PayloadAction<FinanceSummary[]>) => {
      state.financeSummary = action.payload;
    },
    resetFinanceSummary: (state) => {
      state.financeSummary = null;
    },
  },
});

export const { setFinanceSummary, resetFinanceSummary } = analyticSlice.actions;

export default analyticSlice.reducer;

// selectors

export const selectFinanceSummary = (state: RootState) => {
  return state.analytic.financeSummary;
};
