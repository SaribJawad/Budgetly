import { ErrorResponse } from "@/@types/Error";
import { Wallet } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  setGetAllWalletsError,
  setGetAllWalletsStart,
  setGetAllWalletsSuccess,
} from "@/features/wallet/walletSlice";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

interface GetUserWalletResponse {
  statusCode: number;
  data: Wallet[];
  message: string;
  success: boolean;
}

const useGetUserWallet = () => {
  const dispatch = useAppDispatch();
  return useQuery<GetUserWalletResponse, ErrorResponse>({
    queryKey: ["userWallets"],
    queryFn: async () => {
      try {
        dispatch(setGetAllWalletsStart());
        const response = await api.get("/wallet/get-all-wallets");

        const data = response.data.data;
        dispatch(setGetAllWalletsSuccess(data));
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while fetching user's wallet";
          dispatch(setGetAllWalletsError(errorMessage));
        }
        throw error;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetUserWallet;
