import { ErrorResponse } from "@/@types/Error";
import { User } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import { loginStart, loginSuccess } from "@/features/auth/authSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useShowToast from "../useShowToast";

interface LoginResponse {
  statusCode: number;
  data: {
    user: User;
    accessToken: string;
  };
  message: string;
  success: true;
}

interface LoginData {
  email: string;
  password: string;
}

const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, ErrorResponse, LoginData>({
    mutationFn: async ({ email, password }) => {
      try {
        dispatch(loginStart());

        const response = await api.post(
          "/users/login",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data: LoginResponse = response.data;

        return data;
      } catch (error) {
        if (isAxiosError<ErrorResponse>(error) && error.response) {
          const errorResponse =
            error.response.data.message ||
            "Unexpected error occurred try again";
          throw new Error(errorResponse);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      navigate("/", { replace: true });
      dispatch(loginSuccess(data.data.user));
      showToast({
        description: "Logged in.",
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

export default useLogin;
