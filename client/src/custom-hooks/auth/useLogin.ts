import { ErrorResponse } from "@/@types/Error";
import { User } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import { loginStart, loginSuccess } from "@/features/auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data?.message || "An unexpected error occurred.";
          showToast({
            variant: "destructive",
            description: errorMessage,
          });
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      navigate("/", { replace: true });
      dispatch(loginSuccess(data.data.user));
      showToast({
        description: "Logged in.",
      });
    },
  });
};

export default useLogin;
