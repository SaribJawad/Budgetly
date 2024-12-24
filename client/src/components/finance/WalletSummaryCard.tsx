import { Wallet } from "@/@types/Types";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { formatCurrency } from "@/lib/utils";

interface WalletSummaryCardProps {
  wallets: Wallet[];
  walletStatus: "idle" | "loading" | "success" | "error";
}

function WalletSummaryCard({ wallets, walletStatus }: WalletSummaryCardProps) {
  const totalBalance = wallets.reduce((acc, wallet) => acc + wallet.balance, 0);

  return (
    <div className="border border-zinc-800 h-full py-2 px-3 flex flex-col justify-between rounded-2xl md:col-span-1 col-span-2   ">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold sm:text-3xl text-xl">Total balance</h3>
      </div>

      <div
        className={`flex flex-col gap-2 ${
          walletStatus === "loading" ? "h-full" : ""
        }`}
      >
        {walletStatus === "loading" ? (
          <div className="  w-full h-full flex items-center justify-center">
            <LoadingSpinner size={40} />
          </div>
        ) : (
          <>
            <h1 className=" text-5xl font-semibold">
              {formatCurrency(totalBalance)}
            </h1>
            <p className="sm:text-sm text-xs text-zinc-500">
              Your capital consists of {wallets.length} sources
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default WalletSummaryCard;
