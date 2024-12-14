import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShowToast from "../useShowToast";
import { isAxiosError } from "axios";
import { api } from "@/api/axios";
import { ErrorResponse } from "@/@types/Error";

interface EditGoalResponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

interface EditGoalData {
  formData: {
    name?: string;
    targetAmount?: number;
    goalDeadline?: Date;
    savedAlready?: number;
    note?: string;
  };
  goalId: string;
}

const useEditGoal = () => {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation<EditGoalResponse, ErrorResponse, EditGoalData>({
    mutationFn: async ({ formData, goalId }) => {
      try {
        const response = await api.patch(`goal/${goalId}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data.data as EditGoalResponse;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while editing the goal";
          return errorMessage;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });

      showToast({
        description: "Goal updated successfully",
      });
    },
    onError: () => {
      showToast({
        variant: "destructive",
        description: "Failed to update goal. Try again!",
      });
    },
  });
};

export default useEditGoal;
