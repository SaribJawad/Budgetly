import { ErrorResponse } from "@/@types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { api } from "@/api/axios";
import useShowToast from "../useShowToast";

export interface EditWalletResponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

export interface EditWalletData {
  formData: {
    walletName?: string;
    type?: string;
    balance?: number;
  };
  walletId: string;
}

const useEditWallet = () => {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation<EditWalletResponse, ErrorResponse, EditWalletData>({
    mutationFn: async ({ formData, walletId }) => {
      try {
        console.log(formData);
        console.log(walletId);

        const response = await api.patch(
          `wallet/update-wallet-info/${walletId}`
        );

        return response.data.data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while updating the wallet";

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
            "detailedFinanceSummary",
            "balanceOverview",
          ].some((key) => query.queryKey.includes(key)),
      });

      queryClient.refetchQueries({
        predicate: (query) =>
          [
            "financeSummary",
            "detailedFinanceSummary",
            "balanceOverview",
          ].includes(query.queryKey[0] as string),
      });

      showToast({
        description: "Wallet updated successfully",
      });
    },
    onError: () => {
      showToast({
        variant: "destructive",
        description: "Failed to update wallet. Try again!",
      });
    },
  });
};

export default useEditWallet;
