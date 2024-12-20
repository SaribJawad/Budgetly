import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import useShowToast from "../useShowToast";
import { api } from "@/api/axios";
import { ErrorResponse } from "@/@types/Error";

interface UpdateUserAvatar {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

const useUpdateUserAvatar = () => {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation<UpdateUserAvatar, ErrorResponse, File>({
    mutationFn: async (avatarImage) => {
      try {
        const formData = new FormData();
        formData.append("avatar", avatarImage);

        const response = await api.patch("/users/change-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const data = response.data.data;
        return data;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message ||
            "Unexpected error while updating avatar! Try again";
          throw new Error(errorMessage);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Auth"] });
      showToast({
        description: "Avatar updated successfully",
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

export default useUpdateUserAvatar;
