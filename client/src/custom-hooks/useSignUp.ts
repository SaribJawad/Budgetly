import { useMutation } from "@tanstack/react-query";
import useShowToast from "./useShowToast";
import { ErrorResponse } from "@/@types/Error";
import { api } from "@/api/axios";
import axios from "axios";

interface SignUpResponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const useSignUp = () => {
  const showToast = useShowToast();

  return useMutation<SignUpResponse, ErrorResponse, SignUpData>({
    mutationFn: async ({ email, firstName, password, lastName }) => {
      try {
        const response = await api.post(
          "/users/register",
          {
            email,
            firstName,
            lastName,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        return data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data?.message || "An unexpected error occurred";
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
        description: "Signed up. Login with the account to get started",
      });
    },
  });
};

export default useSignUp;
