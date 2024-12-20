import { ErrorResponse } from "@/@types/Error";
import { Transaction } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  setGetMostExpenseError,
  setGetMostExpenseStart,
  setGetMostExpenseSuccess,
} from "@/features/transactions/transactionsSlice";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

interface GetExpenseTransactions {
  statusCode: number;
  data: Transaction[];
  message: string;
  success: boolean;
}

const useGetExpenseTransactions = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetExpenseTransactions, ErrorResponse>({
    queryKey: ["expenseTransactions"],
    queryFn: async () => {
      try {
        dispatch(setGetMostExpenseStart());
        const response = await api.get("/transaction/get-expense-transactions");

        const data = response.data.data;

        dispatch(setGetMostExpenseSuccess(data));
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while fetching expense transactions";

          dispatch(setGetMostExpenseError(errorMessage));
        }
        throw error;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetExpenseTransactions;
