import { ErrorResponse } from "@/@types/Error";
import { YearlyTrend } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  setYearlyTrendsError,
  setYearlyTrendsStart,
  setYearlyTrendsSuccess,
} from "@/features/analytics/analyticSlice";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

interface GetYearlyTrends {
  statusCode: number;
  data: YearlyTrend[];
  message: string;
  success: boolean;
}

const useGetYearlyTrends = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetYearlyTrends, ErrorResponse>({
    queryKey: ["yearlyTrends"],
    queryFn: async () => {
      try {
        dispatch(setYearlyTrendsStart());
        const response = await api("/analytics/get-yearly-trends");

        const data = response.data.data;
        dispatch(setYearlyTrendsSuccess(data));
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while fetching savings overview";
          dispatch(setYearlyTrendsError(errorMessage));
        }
        throw error;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetYearlyTrends;
