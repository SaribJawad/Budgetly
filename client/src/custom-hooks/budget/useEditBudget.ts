import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShowToast from "../useShowToast";
import { isAxiosError } from "axios";
import { api } from "@/api/axios";
import { ErrorResponse } from "@/@types/Error";

interface EditBugetResponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

export interface EditBudgetData {
  budgetId: string;
  formData: {
    name?: string;
    amount?: number;
    category?: string;
    period?: "Week" | "Month" | "Year";
  };
}

const useEditBudget = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  return useMutation<EditBugetResponse, ErrorResponse, EditBudgetData>({
    mutationFn: async ({ budgetId, formData }) => {
      try {
        const response = await api.patch(
          `/budget/update-budget/${budgetId}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data.data;
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message || "An unexpected error occured";
          throw new Error(errorMessage);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBudgets"] });

      showToast({
        description:
          "✏️ Budget updated successfully! Keep making progress toward your goals.",
      });
    },
  });
};

export default useEditBudget;
