import { ErrorResponse } from "@/@types/Error";
import { api } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import useShowToast from "../useShowToast";

interface CreateBudgetResponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

export interface CreateBudgetFormData {
  name: string;
  period: "Week" | "Month" | "Year";
  amount: number;
  category: string;
  wallet: string;
}

const useCreateBudget = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  return useMutation<CreateBudgetResponse, ErrorResponse, CreateBudgetFormData>(
    {
      mutationFn: async ({ name, period, amount, category, wallet }) => {
        try {
          const response = await api.post(
            "/budget/create-budget",
            {
              name,
              period,
              amount,
              category,
              wallet,
            },
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
            console.log(error);
            const errorMessage =
              error.response.data.message ||
              "An unexpected error occured while creating budget";

            throw errorMessage;
          }
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allBudgets"] });

        showToast({
          description:
            "Your budget has been created successfully! Time to start saving and achieve your goals!",
        });
      },
    }
  );
};

export default useCreateBudget;
