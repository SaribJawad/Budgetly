import { ErrorResponse } from "@/@types/Error";
import { Budget } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  setAllBudgetsError,
  setAllBudgetsStart,
  setAllBudgetsSuccess,
} from "@/features/budget/budgetSlice";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

interface GetAllBudgetsResponse {
  statusCode: number;
  data: Budget[];
  message: string;
  success: number;
}

const useGetAllBudgets = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetAllBudgetsResponse, ErrorResponse>({
    queryKey: ["allBudgets"],
    queryFn: async () => {
      try {
        dispatch(setAllBudgetsStart());
        const response = await api.get("/budget/get-all-budgets");
        const data = response.data.data;
        dispatch(setAllBudgetsSuccess(data));
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while fetching the budgets";
          dispatch(setAllBudgetsError(errorMessage));
        }

        throw error;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetAllBudgets;
