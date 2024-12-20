import { useMutation, useQueryClient } from "@tanstack/react-query";
import useShowToast from "../useShowToast";
import { isAxiosError } from "axios";
import { api } from "@/api/axios";
import { User } from "@/@types/Types";
import { ErrorResponse } from "@/@types/Error";

interface UpdateUserInfoResponse {
  statusCode: number;
  data: User;
  messsage: string;
  success: boolean;
}

interface UpdateUserInfoData {
  formData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    currency?: string;
  };
}

const useUpdateUserInfo = () => {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation<UpdateUserInfoResponse, ErrorResponse, UpdateUserInfoData>(
    {
      mutationFn: async ({ formData }) => {
        try {
          const response = await api.patch(
            "/users/update-information",
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
              error.response.data.message ||
              "Unexpected error occured while updating user information! Try again.";

            throw new Error(errorMessage);
          }
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Auth"] });
        showToast({
          description: "User information updated successfully!",
        });
      },
      onError: (error) => {
        showToast({
          variant: "destructive",
          description: error.message,
        });
      },
    }
  );
};

export default useUpdateUserInfo;
