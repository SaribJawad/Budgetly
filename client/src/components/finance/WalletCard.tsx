import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import EditWalletPopup from "../popups/EditWalletPopup";
import { Wallet } from "@/@types/Types";
import { formatCurrency } from "@/lib/utils";

interface WalletCardProps {
  wallet: Wallet;
}

function WalletCard({ wallet }: WalletCardProps) {
  const [togglePopup, setTogglePopup] = useState<boolean>(false);

  const handleClosePopup = (): void => {
    setTogglePopup(false);
  };

  useEffect(() => {
    if (togglePopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [togglePopup]);

  return (
    <div className="cursor-pointer border border-zinc-800  rounded-xl h-full min-w-[220px] w-[280px] p-3 flex flex-col justify-between">
      <div className="  w-full flex justify-between">
        <h4 className="font-semibold text-xl">
          {formatCurrency(wallet?.balance)}
        </h4>
        <Button
          onClick={() => setTogglePopup((prev) => !prev)}
          size="sm"
          className="bg-transparent hover:bg-[#8470FF]"
        >
          <Pencil size={25} />
        </Button>
      </div>
      <div>
        <span className="text-sm text-zinc-500">{wallet.type}</span>
        <h4 className="font-semibold text-2xl">{wallet.walletName}</h4>
      </div>
      {togglePopup && (
        <EditWalletPopup onClose={handleClosePopup} wallet={wallet} />
      )}
    </div>
  );
}

export default WalletCard;
