import { Budget } from "@/@types/Types";
import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  allBudgets: {
    data: Budget[] | null;
    status: "idle" | "loading" | "error" | "success";
    error: string | null;
  };
}

const initialState: InitialState = {
  allBudgets: {
    data: null,
    status: "idle",
    error: null,
  },
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setAllBudgetsStart: (state) => {
      state.allBudgets.error = null;
      state.allBudgets.status = "loading";
    },
    setAllBudgetsSuccess: (state, action: PayloadAction<Budget[]>) => {
      state.allBudgets.error = null;
      state.allBudgets.status = "success";
      state.allBudgets.data = action.payload;
    },
    setAllBudgetsError: (state, action: PayloadAction<string>) => {
      state.allBudgets.error = action.payload;
      state.allBudgets.status = "error";
    },
  },
});

export const { setAllBudgetsStart, setAllBudgetsSuccess, setAllBudgetsError } =
  budgetSlice.actions;

export default budgetSlice.reducer;

// selectors

export const selectAllBudgets = (state: RootState) => {
  return state.budget.allBudgets;
};
