import { Goal } from "@/@types/Types";
import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  allGoals: {
    data: Goal[];
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
  };
}

const initialState: InitialState = {
  allGoals: {
    data: [],
    status: "idle",
    error: null,
  },
};

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setGetAllGoalsStart: (state) => {
      state.allGoals.status = "loading";
      state.allGoals.error = null;
    },
    setGetAllGoalsSuccess: (state, action: PayloadAction<Goal[]>) => {
      state.allGoals.status = "success";
      state.allGoals.data = action.payload;
      state.allGoals.error = null;
    },
    setGetAllGoalsError: (state, action: PayloadAction<string>) => {
      state.allGoals.status = "error";
      state.allGoals.error = action.payload;
    },
  },
});

export const {
  setGetAllGoalsStart,
  setGetAllGoalsSuccess,
  setGetAllGoalsError,
} = goalSlice.actions;

export default goalSlice.reducer;

// selectors

export const selectUserGoals = (state: RootState) => {
  return state.goal.allGoals;
};
