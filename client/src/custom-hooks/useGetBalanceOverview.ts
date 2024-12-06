import { useAppDispatch } from "@/app/hook";
import { useQuery } from "@tanstack/react-query";

interface GetBalanceOverviewResponse {
  statusCode: number;
  data: [];
  message: string;
  success: boolean;
}

const useGetBalanceOverview = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ["balanceOverview"],
    queryFn: async () => {},
  });
};

export default useGetBalanceOverview;
