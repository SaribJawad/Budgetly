import { Wallet } from "@/@types/Types";
import WalletCard from "../finance/WalletCard";
import { Button } from "../ui/button";
import EmptySection from "../ui/EmptySection";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface WalletDisplaySectionProps {
  handlePopup: () => void;
  wallets: Wallet[];
  walletStatus: "idle" | "loading" | "success" | "error";
}

function WalletDisplaySection({
  handlePopup,
  wallets,
  walletStatus,
}: WalletDisplaySectionProps) {
  return (
    <div className=" col-span-2 h-full flex flex-col md:pt-0 pt-4">
      <div className="py-2 px-3 flex items-center justify-between">
        <div className="flex items-start flex-col">
          <h2 className="text-lg font-semibold">
            Your Wallets{" "}
            <span className="text-xs text-zinc-500">
              {wallets.length} {wallets.length > 1 ? "wallets" : "wallet"}
            </span>
          </h2>
          {/*  */}
        </div>
        <Button
          onClick={handlePopup}
          variant="default"
          size="sm"
          className="text-md h-8 bg-[#8470FF] hover:bg-[#6C5FBC] font-medium"
        >
          Add new wallet
        </Button>
      </div>
      {walletStatus === "loading" ? (
        <div className="flex w-full h-full items-center justify-center">
          <LoadingSpinner size={40} />
        </div>
      ) : (
        <div className="w-auto overflow-x-auto flex gap-3  h-full">
          {wallets.length >= 1 ? (
            wallets.map((wallet) => (
              <WalletCard key={wallet._id} wallet={wallet} />
            ))
          ) : (
            <EmptySection
              title="No Wallets Found"
              description="You currently don't have any wallets added. Start by creating a new wallet"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default WalletDisplaySection;
