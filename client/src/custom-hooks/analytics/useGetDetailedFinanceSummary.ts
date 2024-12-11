import { DetailedFinanceSummary } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  setDetailedFinanceSummaryError,
  setDetailedFinanceSummaryStart,
  setDetailedFinanceSummarySuccess,
} from "@/features/analytics/analyticSlice";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ErrorResponse } from "react-router-dom";

interface GetDetailedFinanceSummaryResponse {
  statusCode: number;
  data: DetailedFinanceSummary[];
  message: string;
  success: boolean;
}

const useGetDetailedFinanceSummary = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetDetailedFinanceSummaryResponse, ErrorResponse>({
    queryKey: ["detailedFinanceSummary"],
    queryFn: async () => {
      try {
        dispatch(setDetailedFinanceSummaryStart());
        const response = await api.get(
          "/analytics/get-detailed-finance-summary"
        );

        const data = response.data.data;
        dispatch(setDetailedFinanceSummarySuccess(data));
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while fetching the detailed finance summary";
          dispatch(setDetailedFinanceSummaryError(errorMessage));
        }
        throw error;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetDetailedFinanceSummary;
