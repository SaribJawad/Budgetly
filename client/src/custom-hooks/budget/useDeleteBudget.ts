import { ErrorResponse } from "@/@types/Error";
import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import useShowToast from "../useShowToast";

interface DeleteBudgetResponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  return useMutation<DeleteBudgetResponse, ErrorResponse, string>({
    mutationFn: async (budgetId) => {
      try {
        const response = await api.delete(`/budget/delete-budget/${budgetId}`);
        const data = response.data.data;
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An unexpected error occured while deleting budget";

          throw Error(errorMessage);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBudgets"] });
      showToast({
        description:
          "Budget deleted successfully! It's never too late to create a new budget.",
      });
    },
  });
};

export default useDeleteBudget;
