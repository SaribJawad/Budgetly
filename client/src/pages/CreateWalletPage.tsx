import CreateWalletPageForm from "@/components/forms/CreateWalletPageForm";
import walletPng from "@/assets/images/wallet.png";
import { useAppSelector } from "@/app/hook";
import {
  selectAuthenticationState,
  selectUser,
} from "@/features/auth/authSlice";
import useCreateWallet from "@/custom-hooks/wallet/useCreateWallet";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Navigate } from "react-router-dom";

function CreateWalletPage() {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectAuthenticationState);
  const { mutateAsync: createWallet, isPending } = useCreateWallet();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (user?.walletCreatedOnce) {
    return <Navigate to="/" />;
  }

  if (isPending) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center ">
        <LoadingSpinner className="text-white" size={50} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-around   p-6 min-h-screen h-auto text-white bg-black ">
      <div className="flex items-center flex-col self-start my-5  w-full  border-red-700">
        <h1 className="sm:text-4xl text-3xl text-center  font-bold mb-4">
          Welcome to Budgetly, {user?.firstName}
        </h1>
        <p className="text-md text-zinc-500 text-center mb-6">
          Let's set up your wallet so you can begin tracking and organizing your
          budget right away.
        </p>
      </div>

      <img src={walletPng} alt="Wallet Illustration" className="w-52 h-52 " />

      <div className="flex flex-col items-center  gap-5 ">
        <CreateWalletPageForm createWallet={createWallet} />
      </div>
    </div>
  );
}

export default CreateWalletPage;
