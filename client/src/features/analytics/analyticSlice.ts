import { FinanceSummary, MonthlyFlow } from "@/@types/Types";
import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  financeSummary: FinanceSummary[] | null;
  monthlyFlow: {
    data: MonthlyFlow[] | null;
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
  };
}

const initialState: InitialState = {
  financeSummary: null,
  monthlyFlow: {
    data: null,
    status: "idle",
    error: null,
  },
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
    setMonthlyFlowStart: (state) => {
      state.monthlyFlow.status = "loading";
      state.monthlyFlow.data = null;
    },
    setMonthlyFlowSuccess: (state, action: PayloadAction<MonthlyFlow[]>) => {
      state.monthlyFlow.data = action.payload;
      state.monthlyFlow.status = "success";
    },
    setMonthlyFlowError: (state, action: PayloadAction<string>) => {
      state.monthlyFlow.data = null;
      state.monthlyFlow.status = "error";
      state.monthlyFlow.error = action.payload;
    },
  },
});

export const {
  setFinanceSummary,
  resetFinanceSummary,
  setMonthlyFlowStart,
  setMonthlyFlowSuccess,
  setMonthlyFlowError,
} = analyticSlice.actions;

export default analyticSlice.reducer;

// selectors

export const selectFinanceSummary = (state: RootState) => {
  return state.analytic.financeSummary;
};

export const selectMonthlyFlow = (state: RootState) => {
  return state.analytic.monthlyFlow;
};
