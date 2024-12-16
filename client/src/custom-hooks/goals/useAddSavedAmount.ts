import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShowToast from "../useShowToast";
import { isAxiosError } from "axios";
import { api } from "@/api/axios";
import { Goal } from "@/@types/Types";
import { ErrorResponse } from "@/@types/Error";

interface AddSavedAmountResponse {
  statusCode: number;
  data: Goal;
  message: string;
  success: boolean;
}

interface FormData {
  goalId: string;
  savedAmount: number;
}

const useAddSavedAmount = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  return useMutation<AddSavedAmountResponse, ErrorResponse, FormData>({
    mutationFn: async ({ goalId, savedAmount }) => {
      try {
        const response = await api.patch(
          `/goal/add-saved-amount/${goalId}`,
          { savedAmount },
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
            error.response.data.message ||
            "An unexpected error occured while adding saved amount ";
          throw errorMessage;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      showToast({
        description: "Amount successfully added to your goal!",
      });
    },
  });
};

export default useAddSavedAmount;
