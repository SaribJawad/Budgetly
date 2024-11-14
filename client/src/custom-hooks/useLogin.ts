import { ErrorResponse } from "@/@types/Error";
import { User } from "@/@types/User";
import { useAppDispatch } from "@/app/hook";
import { loginStart, loginSuccess } from "@/features/auth/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation<LoginResponse, ErrorResponse, LoginData>({
    mutationFn: async ({ email, password }) => {
      try {
        dispatch(loginStart());

        const response = await axios.post(
          "/api/v1/users/login",
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
          toast({
            variant: "destructive",
            className: " text-white rounded-lg p-5 shadow-xl",
            duration: 3000,
            description: errorMessage,
          });
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      navigate("/", { replace: true });
      dispatch(loginSuccess(data.data.user));
    },
  });
};

export default useLogin;
