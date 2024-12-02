// import { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";

import { Wallet } from "@/@types/Types";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface WalletSummaryCardProps {
  wallets: Wallet[];
  walletStatus: "idle" | "loading" | "success" | "error";
}

function WalletSummaryCard({ wallets, walletStatus }: WalletSummaryCardProps) {
  // const [selectedWallet, setSelectedWallet] = useState<string>("All wallets");

  const totalBalance = wallets.reduce((acc, wallet) => acc + wallet.balance, 0);

  return (
    <div className="border border-zinc-800 h-full py-2 px-3 flex flex-col justify-between rounded-2xl md:col-span-1 col-span-2   ">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold sm:text-3xl text-xl">Total balance</h3>
        {/* <Select
          defaultValue={selectedWallet}
          onValueChange={(value) => setSelectedWallet(value)}
        >
          <SelectTrigger
            className="w-auto rounded-full text-sm"
            style={{
              boxShadow: "none",
              outline: "none",
            }}
          >
            <SelectValue placeholder="Select Wallet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="block text-left" value="All wallets">
              All wallets
            </SelectItem>
            <SelectItem value="walletID1">WalletName1</SelectItem>
            <SelectItem value="walletID2">WalletName2</SelectItem>
            <SelectItem value="walletID3">WalletName3</SelectItem>
          </SelectContent>
        </Select> */}
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
            <h1 className=" text-5xl font-semibold">{totalBalance}</h1>
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
