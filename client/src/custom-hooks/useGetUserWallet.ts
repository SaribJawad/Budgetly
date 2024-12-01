import { useQuery } from "@tanstack/react-query";

interface GetUserWalletResponse {}

const useGetUserWallet = () => {
  return useQuery({
    queryKey: ["userWallets"],
    queryFn: async () => {},
  });
};

export default useGetUserWallet;
