import { Transaction } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  setGetAllTransactionsStart,
  setGetAllTransactionsSuccess,
  setGetAllTransasctionsError,
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
  const pageNum = useParams<{ pageNum: string }>().pageNum || "1";
  const limit = useParams<{ limit: string }>().limit || "10";
  const dispatch = useAppDispatch();

  return useQuery<useGetAllTransactionResponse, ErrorResponse>({
    queryKey: ["allTransactions", pageNum, limit],
    queryFn: async () => {
      try {
        dispatch(setGetAllTransactionsStart());
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
          dispatch(setGetAllTransasctionsError(errorMessage));
        }
        throw error;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: Boolean(pageNum && limit),
  });
};

export default useGetAllTranscations;
