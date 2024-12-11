import { ErrorResponse } from "@/@types/Error";
import { Goal } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import {
  setGetAllGoalsError,
  setGetAllGoalsStart,
  setGetAllGoalsSuccess,
} from "@/features/goal/goalSlice";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

interface UseGetAllGoalsResponse {
  statusCode: number;
  data: Goal[];
  message: string;
  success: boolean;
}

const useGetAllGoals = () => {
  const dispatch = useAppDispatch();

  return useQuery<UseGetAllGoalsResponse, ErrorResponse>({
    queryKey: ["goals"],
    queryFn: async () => {
      try {
        dispatch(setGetAllGoalsStart());
        const response = await api.get("/goal/get-all-goals");
        const data = response.data.data;
        dispatch(setGetAllGoalsSuccess(data));

        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occurred while fetching goals";
          dispatch(setGetAllGoalsError(errorMessage));
        }
        throw error;
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useGetAllGoals;
