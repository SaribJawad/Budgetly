import { ErrorResponse } from "@/@types/Error";
import { User } from "@/@types/User";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import { loginSuccess, setAuthStatus } from "@/features/auth/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GetAuthStatusResponse {
  status: number;
  user: User;
  message: string;
  success: boolean;
}

export const useGetAuthStatus = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  return useQuery<GetAuthStatusResponse, ErrorResponse>({
    queryKey: ["Auth"],
    queryFn: async () => {
      try {
        const response = await api.get("/users/auth-verify");

        dispatch(loginSuccess(response.data.data));

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message || "An unexpected error occurred";

          toast({
            variant: "destructive",
            className: " text-white rounded-lg p-5 shadow-xl",
            duration: 3000,
            description: errorMessage,
          });

          dispatch(setAuthStatus(false));
        }

        throw error;
      }
    },
    refetchOnWindowFocus: false,
  });
};
