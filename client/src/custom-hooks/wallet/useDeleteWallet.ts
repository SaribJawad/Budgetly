import { ErrorResponse } from "@/@types/Error";
import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import useShowToast from "../useShowToast";

interface DeleteWalletResponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

interface WalletId {
  walletId: string;
}

const useDeleteWallet = () => {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation<DeleteWalletResponse, ErrorResponse, WalletId>({
    mutationFn: async ({ walletId }) => {
      try {
        const response = await api.delete(`/wallet/delete-wallet/${walletId}`);
        return response.data.data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error while deleting the wallet";
          return errorMessage;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          [
            "financeSummary",
            "userWallets",
            "monthlyFlow",
            "allTransactions",
            "savingOverview",
            "allBudgets",
            "detailedFinanceSummary",
            "balanceOverview",
            "yearlyTrends",
          ].some((key) => query.queryKey.includes(key)),
        exact: false,
      });

      queryClient.refetchQueries({
        predicate: (query) =>
          [
            "financeSummary",
            "savingOverview",
            "allBudgets",
            "detailedFinanceSummary",
            "balanceOverview",
            "yearlyTrends",
          ].includes(query.queryKey[0] as string),
      });

      showToast({
        description:
          "Wallet deleted successfully! 🗑️ It has been removed from your account.",
      });
    },
  });
};

export default useDeleteWallet;
