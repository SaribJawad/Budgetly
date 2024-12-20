import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShowToast from "../useShowToast";
import { isAxiosError } from "axios";
import { Transaction } from "@/@types/Types";
import { ErrorResponse } from "@/@types/Error";
import { api } from "@/api/axios";

interface AddTransactionsResponse {
  statusCode: number;
  data: Transaction;
  message: string;
  success: boolean;
}

export interface AddTransactionFormData {
  formData: {
    amount: number;
    transactionType: string;
    note?: string;
    category?: string;
    payee?: string;
    payer?: string;
    fromWallet?: string;
    toWallet?: string;
    paymentType:
      | "Cash"
      | "Debit card"
      | "Credit card"
      | "Bank transfer"
      | "Voucher"
      | "Mobile payment"
      | "Web payment";
    date?: Date;
  };
}

const useAddTransactions = () => {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation<
    AddTransactionsResponse,
    ErrorResponse,
    AddTransactionFormData
  >({
    mutationFn: async ({ formData }) => {
      try {
        const response = await api.post(
          "/transaction/create-transaction",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data.data;
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while adding transaction";

          showToast({
            description: errorMessage,
          });
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
          ].includes(query.queryKey[0] as string),
      });

      showToast({
        description:
          "Transactions added successfully! 🎉 Your data has been saved.",
      });
    },
  });
};

export default useAddTransactions;
