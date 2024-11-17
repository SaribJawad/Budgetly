import { ErrorResponse } from "@/@types/Error";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";

import { logout } from "@/features/auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useShowToast from "./useShowToast";

interface LogoutResponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const showToast = useShowToast();

  return useMutation<LogoutResponse, ErrorResponse>({
    mutationFn: async () => {
      try {
        const response = await api.get("/users/logout");
        dispatch(logout());

        const data: LogoutResponse = response.data;
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message || "An unexpected error occured";
          showToast({
            variant: "destructive",
            description: errorMessage,
          });
        }
        throw error;
      }
    },
    onSuccess: () => {
      showToast({
        description: "Logged out.",
      });
    },
  });
};
