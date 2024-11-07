import { Pencil } from "lucide-react";
import BudgetStatusCard from "../status/BudgetStatusCard";
import { useState } from "react";
import EditBudgetPopup from "../popups/EditBudgetPopup";

function BudgetCard() {
  const [togglePopup, setTogglePopup] = useState<boolean>(false);

  const handleClosePopup = (): void => {
    setTogglePopup(false);
  };

  return (
    <div className="border border-zinc-800 p-2 pb-4 rounded-2xl flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold">Food & Groceries</h2>
        <button
          onClick={() => setTogglePopup((prev) => !prev)}
          className="rounded-full p-2 border border-zinc-800 hover:border-white"
        >
          <Pencil size={18} />
        </button>
      </div>

      <div className="  flex items-center justify-around">
        {/* radial progress */}
        <div
          className="radial-progress text-center  text-[#917FFF]  "
          style={
            {
              "--value": 50,
              "--size": "8rem",
              "--thickness": ".5rem",
            } as React.CSSProperties
          }
          role="progressbar"
        >
          <h5 className="text-xs text-zinc-500">Total spent</h5>
          <span className="text-white text-md font-semibold">$124</span>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-xs text-zinc-500">Left</h5>
          <h2 className="text-xl font-semibold">
            $152.50 <span className="text-xs text-[#8E7CFF]">/$650</span>
          </h2>
          <BudgetStatusCard />
        </div>
      </div>
      {togglePopup && <EditBudgetPopup onClose={handleClosePopup} />}
    </div>
  );
}

export default BudgetCard;
