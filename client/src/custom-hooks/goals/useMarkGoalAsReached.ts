import { ErrorResponse } from "@/@types/Error";
import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import useShowToast from "../useShowToast";

interface MarkGoalAsReached {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

type GoalId = {
  goalId: string;
};

const useMarkGoalAsReached = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  return useMutation<MarkGoalAsReached, ErrorResponse, GoalId>({
    mutationFn: async ({ goalId }) => {
      try {
        const response = await api.patch(`/goal/mark-as-reached/${goalId}`);
        const data = response.data.data;
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while setting goal reached";
          throw errorMessage;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      showToast({
        description: "Congratulations! You've successfully reached your goal.",
      });
    },
  });
};

export default useMarkGoalAsReached;
