import WalletCard from "../finance/WalletCard";
import { Button } from "../ui/button";

function WalletDisplaySection() {
  return (
    <div className=" col-span-2 h-full flex flex-col md:pt-0 pt-4">
      <div className="py-2 px-3 flex items-center justify-between">
        <div className="flex items-start flex-col">
          <h2 className="text-lg font-semibold">Your Wallets</h2>
          {/* <span className="text-[10px] text-zinc-500">3 wallets</span> */}
        </div>
        <Button
          variant="default"
          size="sm"
          className="text-md h-8 bg-[#8470FF] hover:bg-[#6C5FBC] font-medium"
        >
          Add new wallet
        </Button>
      </div>
      <div className="w-auto overflow-x-auto flex gap-3  h-full">
        <WalletCard />
        <WalletCard />
        <WalletCard />
      </div>
    </div>
  );
}

export default WalletDisplaySection;
