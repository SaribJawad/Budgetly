import useShowToast from "./useShowToast";
import { useMutation } from "@tanstack/react-query";
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

interface CreateWalletData {
  walletName: string;
  currency: string;
  type?: string;
  balance?: number;
}

const useCreateWallet = () => {
  const showToast = useShowToast();

  return useMutation<CreateWalletResponse, ErrorResponse, CreateWalletData>({
    mutationFn: async ({ balance, currency, type, walletName }) => {
      try {
        const response = await api.post(
          "/wallet/create-wallet",
          {
            balance,
            currency,
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
      showToast({
        description:
          "Wallet created! You can create more wallets on wallets page.",
      });
    },
  });
};

export default useCreateWallet;
