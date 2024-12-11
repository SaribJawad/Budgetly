import { ErrorResponse } from "@/@types/Error";
import { MonthlyFlow } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  setMonthlyFlowError,
  setMonthlyFlowStart,
  setMonthlyFlowSuccess,
} from "@/features/analytics/analyticSlice";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

interface GetMonthlyFlowResponse {
  statusCode: number;
  data: MonthlyFlow[];
  message: string;
  success: boolean;
}

const useGetMonthlyFlow = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetMonthlyFlowResponse, ErrorResponse>({
    queryKey: ["monthlyFlow"],
    queryFn: async () => {
      dispatch(setMonthlyFlowStart());
      try {
        const response = await api.get("/analytics/monthly-flow");
        const data = response.data.data;
        dispatch(setMonthlyFlowSuccess(data));
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while fetching monthly flow";
          dispatch(setMonthlyFlowError(errorMessage));
        }
        throw error;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetMonthlyFlow;
