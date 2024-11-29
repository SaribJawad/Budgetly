import { Transaction } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  selectAllTransactions,
  setGetAllTransactionsStart,
  setGetAllTransactionsSuccess,
  setGetAllTransasctionError,
} from "@/features/transactions/transactionsSlice";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ErrorResponse, useParams } from "react-router-dom";

interface Data {
  transactions: Transaction[];
  totalCount: number;
}

interface useGetAllTransactionResponse {
  statusCode: number;
  data: Data;
  message: string;
  success: boolean;
}

const useGetAllTranscations = () => {
  const { pageNum, limit } = useParams();
  const dispatch = useAppDispatch();
  // const { loadedPages } = useAppSelector(selectAllTransactions);

  return useQuery<useGetAllTransactionResponse, ErrorResponse>({
    queryKey: ["allTransactions", pageNum, limit],
    queryFn: async () => {
      // if (!loadedPages.includes(Number(pageNum))) {
      dispatch(setGetAllTransactionsStart());
      try {
        const response = await api.get(
          `/transaction/get-all-transactions?page=${pageNum}&limit=${limit}`
        );
        const data = response.data.data;
        dispatch(
          setGetAllTransactionsSuccess({
            transactions: data.transactions,
            totalTransactions: data.totalCount,
            page: Number(pageNum),
            pageSize: Number(limit),
          })
        );
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while fetching all transactions";
          console.log(errorMessage);
          dispatch(setGetAllTransasctionError(errorMessage));
        }
        throw error;
        // }
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetAllTranscations;
