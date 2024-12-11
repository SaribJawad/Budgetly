import { ErrorResponse } from "@/@types/Error";
import { SavingOverview } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  setSavingOverviewError,
  setSavingOverviewStart,
  setSavingOverviewSuccess,
} from "@/features/analytics/analyticSlice";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

interface GetSavingOverviewResponse {
  statusCode: number;
  data: SavingOverview[];
  message: string;
  success: boolean;
}

const useGetSavingOverview = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetSavingOverviewResponse, ErrorResponse>({
    queryKey: ["savingOverview"],
    queryFn: async () => {
      try {
        dispatch(setSavingOverviewStart());
        const response = await api.get("/analytics/get-saving-overview");
        const data = response.data.data;
        dispatch(setSavingOverviewSuccess(data));

        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while fetching saving overview";
          dispatch(setSavingOverviewError(errorMessage));
        }
        throw error;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetSavingOverview;
