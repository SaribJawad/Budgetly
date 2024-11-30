import { ErrorResponse } from "@/@types/Error";
import { Transaction } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  setGetFilteredTransactionsError,
  setGetFilteredTransactionsStart,
  setGetFilteredTransactionsSuccess,
} from "@/features/transactions/transactionsSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

interface GetFilteredTransactionsResponse {
  statusCode: number;
  data: {
    filteredTransactions: Transaction[];
    totalCount: number;
  };
}

interface FilterData {
  transactionType?: string;
  fromDate?: string;
  toDate?: string;
}

const useGetFilteredTransactions = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation<
    GetFilteredTransactionsResponse,
    ErrorResponse,
    FilterData
  >({
    mutationFn: async (filterData) => {
      const bodyData: Partial<FilterData> = {};
      if (filterData.fromDate) bodyData.fromDate = filterData.fromDate;
      if (filterData.toDate) bodyData.toDate = filterData.toDate;
      if (filterData.transactionType)
        bodyData.transactionType = filterData.transactionType;

      const cacheKey = ["filteredTransactions", bodyData];
      console.log(bodyData);
      console.log(cacheKey);
      const cachedData = queryClient.getQueryData(cacheKey);

      if (cachedData) {
        return cachedData as GetFilteredTransactionsResponse["data"];
      }

      try {
        dispatch(setGetFilteredTransactionsStart());
        const response = await api.post(
          "/transaction/filtered-transactions",
          bodyData
        );
        const data = response.data.data;
        // Save to cache
        queryClient.setQueryData(cacheKey, data);
        dispatch(
          setGetFilteredTransactionsSuccess({
            filteredTransactions: data.filteredTransactions,
            filterCriteria: bodyData,
          })
        );

        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while fetching filtered transactions";
          dispatch(setGetFilteredTransactionsError(errorMessage));
        }
      }
    },
  });
};

export default useGetFilteredTransactions;
