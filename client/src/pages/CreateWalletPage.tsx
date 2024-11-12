import CreateWalletPageForm from "@/components/forms/CreateWalletPageForm";
import walletPng from "@/assets/images/wallet.png";

function CreateWalletPage() {
  return (
    <div className="w-full flex flex-col items-center justify-around   p-6 min-h-screen h-auto text-white bg-black ">
      <div className="flex items-center flex-col self-start my-5  w-full  border-red-700">
        <h1 className="sm:text-4xl text-3xl  font-bold mb-4">
          Welcome to Budgetly
        </h1>
        <p className="text-md text-zinc-500 text-center mb-6">
          Let's set up your wallet so you can begin tracking and organizing your
          budget right away.
        </p>
      </div>

      <img src={walletPng} alt="Wallet Illustration" className="w-52 h-52 " />

      <div className="flex flex-col items-center  gap-5 ">
        <CreateWalletPageForm />
      </div>
    </div>
  );
}

export default CreateWalletPage;
