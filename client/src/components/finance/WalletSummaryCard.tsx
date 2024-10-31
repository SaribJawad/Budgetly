import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function WalletSummaryCard() {
  const [selectedWallet, setSelectedWallet] = useState<string>("All wallets");

  return (
    <div className="border border-zinc-800 h-full py-2 px-3 flex flex-col justify-between rounded-2xl md:col-span-1 col-span-2   ">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-3xl">Total balance</h3>
        <Select
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
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-semibold">$15,800</h1>
        <p className="text-sm text-zinc-500">
          Your capital consists of 3 sources
        </p>
      </div>
    </div>
  );
}

export default WalletSummaryCard;
