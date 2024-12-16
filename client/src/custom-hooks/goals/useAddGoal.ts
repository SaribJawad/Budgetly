import { ErrorResponse } from "@/@types/Error";
import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import useShowToast from "../useShowToast";
import { Goal } from "@/@types/Types";

interface AddGoalsResponse {
  statusCode: number;
  data: Goal;
  message: string;
  success: boolean;
}

export interface FormData {
  name: string;
  targetAmount: number;
  goalDeadline: Date;
  savedAlready?: number;
}

const useAddGoals = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  return useMutation<AddGoalsResponse, ErrorResponse, FormData>({
    mutationFn: async (FormData) => {
      try {
        const createGoalData = {
          ...FormData,
          goalDeadline: FormData.goalDeadline.toISOString().split("T")[0],
        };

        const response = await api.post("goal/create-goal", createGoalData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = response.data.data;
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while creating the goal";
          throw errorMessage;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });

      showToast({
        description: "Goal created successfully!",
      });
    },
  });
};

export default useAddGoals;
