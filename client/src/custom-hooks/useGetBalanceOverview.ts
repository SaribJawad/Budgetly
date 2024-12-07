import { ErrorResponse } from "@/@types/Error";
import { BalanceOverview } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  setBalanceOverviewError,
  setBalanceOverviewStart,
  setBalanceOverviewSuccess,
} from "@/features/analytics/analyticSlice";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

interface GetBalanceOverviewResponse {
  statusCode: number;
  data: BalanceOverview[];
  message: string;
  success: boolean;
}

const useGetBalanceOverview = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetBalanceOverviewResponse, ErrorResponse>({
    queryKey: ["balanceOverview"],
    queryFn: async () => {
      try {
        dispatch(setBalanceOverviewStart());
        const response = await api.get("/analytics/get-balance-overview");
        const data = response.data.data;
        dispatch(setBalanceOverviewSuccess(data));

        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while fetching balance overview";
          dispatch(setBalanceOverviewError(errorMessage));
        }
        throw error;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetBalanceOverview;
