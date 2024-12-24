import useShowToast from "../useShowToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Wallet } from "@/@types/Types";
import { ErrorResponse } from "@/@types/Error";
import { api } from "@/api/axios";
import axios from "axios";

export interface CreateWalletResponse {
  statusCode: number;
  data: Wallet;
  message: string;
  success: boolean;
}

export interface CreateWalletData {
  walletName: string;
  type?: string;
  balance?: number;
}

const useCreateWallet = () => {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation<CreateWalletResponse, ErrorResponse, CreateWalletData>({
    mutationFn: async ({ balance, type, walletName }) => {
      try {
        const response = await api.post(
          "/wallet/create-wallet",
          {
            balance,

            type,
            walletName,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message || "An unxpected error occured";
          showToast({
            variant: "destructive",
            description: errorMessage,
          });
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          ["financeSummary", "userWallets", "Auth"].some((key) => {
            return query.queryKey.includes(key);
          }),
      });
      queryClient.refetchQueries({ queryKey: ["financeSummary"] });

      showToast({
        description:
          "Wallet created successfully! 🎉 You can now start using it.",
      });
    },
  });
};

export default useCreateWallet;
