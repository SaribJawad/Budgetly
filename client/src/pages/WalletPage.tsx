import WalletDisplaySection from "@/components/data-display/WalletDisplaySection";
import RecentTransactionsCard from "@/components/finance/RecentTransactionsCard";
import TransactionOverviewCard from "@/components/finance/TransactionOverviewCard";
import WalletSummaryCard from "@/components/finance/WalletSummaryCard";
import Header from "@/components/navigation/Header";
import CreateWalletPopup from "@/components/popups/CreateWalletPopup";
import { useEffect, useState } from "react";

function WalletPage() {
  const [togglePopup, setTogglePopup] = useState<boolean>(false);

  const handlePopup = (): void => {
    setTogglePopup((prev) => !prev);
  };

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
    <div className="w-full min-h-screen  p-2 flex flex-col justify-around gap-3">
      <Header
        heading={"Wallet"}
        note={"Overview of your balance and accounts"}
      />

      <div className="h-[40%]   grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  md:gap-4">
        <WalletSummaryCard />
        <WalletDisplaySection handlePopup={handlePopup} />
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-3  h-full   ">
        <div className="lg:col-span-3 col-span-1  flex flex-col gap-3 ">
          <TransactionOverviewCard />
          <RecentTransactionsCard />
        </div>
      </div>
      {togglePopup && <CreateWalletPopup onClose={handleClosePopup} />}
    </div>
  );
}

export default WalletPage;
