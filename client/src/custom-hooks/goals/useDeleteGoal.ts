import { ErrorResponse } from "@/@types/Error";
import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import useShowToast from "../useShowToast";

interface DeleteGoalReponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

type GoalId = {
  goalId: string;
};

const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  return useMutation<DeleteGoalReponse, ErrorResponse, GoalId>({
    mutationFn: async ({ goalId }) => {
      try {
        const response = await api.delete(`/goal/${goalId}`);
        const data = response.data.data;
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while deleting the goal";
          throw errorMessage;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      showToast({
        variant: "destructive",
        description: "Goal deleted successfully.",
      });
    },
  });
};

export default useDeleteGoal;
