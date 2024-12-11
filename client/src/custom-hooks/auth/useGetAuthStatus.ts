import { ErrorResponse } from "@/@types/Error";
import { User } from "@/@types/Types";
import { api } from "@/api/axios";
import { useAppDispatch } from "@/app/hook";
import { loginSuccess, setAuthStatus } from "@/features/auth/authSlice";
import { useQuery } from "@tanstack/react-query";

interface GetAuthStatusResponse {
  status: number;
  user: User;
  message: string;
  success: boolean;
}

export const useGetAuthStatus = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetAuthStatusResponse, ErrorResponse>({
    queryKey: ["Auth"],
    queryFn: async () => {
      try {
        const response = await api.get("/users/auth-verify");

        dispatch(loginSuccess(response.data.data));

        return response.data;
      } catch (error) {
        dispatch(setAuthStatus(false));

        throw error;
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
