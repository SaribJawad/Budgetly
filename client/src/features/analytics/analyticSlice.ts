import {
  BalanceOverview,
  DetailedFinanceSummary,
  FinanceSummary,
  MonthlyFlow,
  SavingOverview,
  YearlyTrend,
} from "@/@types/Types";
import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  financeSummary: FinanceSummary[] | null;
  monthlyFlow: {
    data: MonthlyFlow[] | null;
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
  };
  yearlyTrends: {
    data: YearlyTrend[] | null;
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
  };
  savingOverview: {
    data: SavingOverview[] | null;
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
  };
  balanceOverview: {
    data: BalanceOverview[] | null;
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
  };
  detailedFinanceSummary: {
    data: DetailedFinanceSummary[] | null;
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
  yearlyTrends: {
    data: null,
    status: "idle",
    error: null,
  },
  savingOverview: {
    data: null,
    status: "idle",
    error: null,
  },
  balanceOverview: {
    data: null,
    status: "idle",
    error: null,
  },
  detailedFinanceSummary: {
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
    setYearlyTrendsStart: (state) => {
      state.yearlyTrends.status = "loading";
      state.yearlyTrends.error = null;
    },
    setYearlyTrendsSuccess: (state, action: PayloadAction<YearlyTrend[]>) => {
      state.yearlyTrends.status = "success";
      state.yearlyTrends.error = null;
      state.yearlyTrends.data = action.payload;
    },
    setYearlyTrendsError: (state, action: PayloadAction<string>) => {
      state.yearlyTrends.status = "loading";
      state.yearlyTrends.error = action.payload;
    },
    setSavingOverviewStart: (state) => {
      state.savingOverview.error = null;
      state.savingOverview.status = "loading";
    },
    setSavingOverviewSuccess: (
      state,
      action: PayloadAction<SavingOverview[]>
    ) => {
      state.savingOverview.error = null;
      state.savingOverview.status = "success";
      state.savingOverview.data = action.payload;
    },
    setSavingOverviewError: (state, action: PayloadAction<string>) => {
      state.savingOverview.error = action.payload;
      state.savingOverview.status = "error";
    },
    setBalanceOverviewStart: (state) => {
      state.balanceOverview.error = null;
      state.balanceOverview.status = "loading";
    },
    setBalanceOverviewSuccess: (
      state,
      action: PayloadAction<BalanceOverview[]>
    ) => {
      state.balanceOverview.error = null;
      state.balanceOverview.status = "success";
      state.balanceOverview.data = action.payload;
    },
    setBalanceOverviewError: (state, action: PayloadAction<string>) => {
      state.balanceOverview.error = action.payload;
      state.balanceOverview.status = "error";
    },
    setDetailedFinanceSummaryStart: (state) => {
      state.detailedFinanceSummary.error = null;
      state.detailedFinanceSummary.status = "loading";
    },
    setDetailedFinanceSummarySuccess: (
      state,
      action: PayloadAction<DetailedFinanceSummary[]>
    ) => {
      state.detailedFinanceSummary.error = null;
      state.detailedFinanceSummary.status = "success";
      state.detailedFinanceSummary.data = action.payload;
    },
    setDetailedFinanceSummaryError: (state, action: PayloadAction<string>) => {
      state.detailedFinanceSummary.error = action.payload;
      state.detailedFinanceSummary.status = "loading";
    },
  },
});

export const {
  setFinanceSummary,
  resetFinanceSummary,
  setMonthlyFlowStart,
  setMonthlyFlowSuccess,
  setMonthlyFlowError,
  setYearlyTrendsStart,
  setYearlyTrendsSuccess,
  setYearlyTrendsError,
  setSavingOverviewStart,
  setSavingOverviewSuccess,
  setSavingOverviewError,
  setBalanceOverviewStart,
  setBalanceOverviewSuccess,
  setBalanceOverviewError,
  setDetailedFinanceSummaryStart,
  setDetailedFinanceSummarySuccess,
  setDetailedFinanceSummaryError,
} = analyticSlice.actions;

export default analyticSlice.reducer;

// selectors

export const selectFinanceSummary = (state: RootState) => {
  return state.analytic.financeSummary;
};

export const selectMonthlyFlow = (state: RootState) => {
  return state.analytic.monthlyFlow;
};

export const selectYearlyTrends = (state: RootState) => {
  return state.analytic.yearlyTrends;
};

export const selectSavingOverview = (state: RootState) => {
  return state.analytic.savingOverview;
};

export const selectBalanceOverview = (state: RootState) => {
  return state.analytic.balanceOverview;
};

export const selectDetailedFinanceSummary = (state: RootState) => {
  return state.analytic.detailedFinanceSummary;
};
