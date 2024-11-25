import { ErrorResponse } from "@/@types/Error";
import { FinanceSummary } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  resetFinanceSummary,
  setFinanceSummary,
} from "@/features/analytics/analyticSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GetFinanceSummary {
  statusCode: number;
  data: FinanceSummary;
  message: string;
  success: boolean;
}

const useGetFinanceSummary = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetFinanceSummary, ErrorResponse>({
    queryKey: ["financeSummary"],
    queryFn: async () => {
      try {
        const response = await api.get("/analytics/get-finance-summary");
        const data = response.data.data;
        dispatch(setFinanceSummary(data));
        return data;
      } catch (error) {
        dispatch(resetFinanceSummary());
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message || "An unexpected error occurred.";
          console.error(errorMessage);
        }

        throw error;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export default useGetFinanceSummary;
