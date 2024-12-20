import { useMutation } from "@tanstack/react-query";
import useShowToast from "../useShowToast";
import { isAxiosError } from "axios";
import { api } from "@/api/axios";
import { ErrorResponse } from "@/@types/Error";

interface UpdateUserPasswordResponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

interface UpdateUserFormData {
  formData: {
    newPassword?: string;
    oldPassword?: string;
  };
}

const useUpdateUserPassword = () => {
  const showToast = useShowToast();

  return useMutation<
    UpdateUserPasswordResponse,
    ErrorResponse,
    UpdateUserFormData
  >({
    mutationFn: async ({ formData }) => {
      try {
        const response = await api.patch("/users/change-password", formData, {
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
            "Unexpected error occured while updating the password! Try again.";

          throw new Error(errorMessage);
        }
      }
    },
    onSuccess: () => {
      showToast({
        description: "Updated password successfully!",
      });
    },
    onError: (error) => {
      showToast({
        variant: "destructive",
        description: error.message,
      });
    },
  });
};

export default useUpdateUserPassword;
