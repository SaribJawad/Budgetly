import { ErrorResponse } from "@/@types/Error";
import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import useShowToast from "../useShowToast";

interface DeleteTransactionsResponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

const useDeleteTransactions = () => {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation<DeleteTransactionsResponse, ErrorResponse, string>({
    mutationFn: async (transactionId) => {
      try {
        const response = await api.delete(`/transaction/${transactionId}`);
        const data = response.data.dat;
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "Unexpected error occured while deleting transaction";
          throw new Error(errorMessage);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          [
            "allTransactions",
            "monthlyFlow",
            "savingOverview",
            "expenseTransactions",
            "financeSummary",
            "detailedFinanceSummary",
            "yearlyTrends",
          ].some((key) => query.queryKey.includes(key)),
        exact: false,
      });

      queryClient.refetchQueries({
        predicate: (query) =>
          [
            "monthlyFlow",
            "savingOverview",
            "financeSummary",
            "detailedFinanceSummary",
            "yearlyTrends",
            "expenseTransactions",
          ].includes(query.queryKey[0] as string),
      });

      showToast({ description: "Transaction delete successfully!" });
    },
    onError: (error) => {
      showToast({
        variant: "destructive",
        description: error.message,
      });
    },
  });
};

export default useDeleteTransactions;
