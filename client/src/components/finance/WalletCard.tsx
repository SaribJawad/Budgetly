import { WalletMinimal } from "lucide-react";

function WalletCard() {
  const number = 12345679;

  const asd = number.toString().replace(/^(\d{5})/, "*****");

  return (
    <div className="cursor-pointer bg-gradient-to-r from-[#8e7dfc] via-[#a395fb] to-[#7a60e2] rounded-xl h-full min-w-[220px] w-[280px] p-3 flex flex-col justify-between">
      <div className="  w-full flex justify-between">
        <h4 className="font-semibold text-xl">$8,000</h4>
        <WalletMinimal size={20} />
      </div>
      <div className="flex flex-col">
        <h4 className="font-semibold text-xl">Account name</h4>
        <span className="text-xs">{asd}</span>
      </div>
    </div>
  );
}

export default WalletCard;
