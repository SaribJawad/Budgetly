import { CircleAlert, CircleCheckBig, CircleX } from "lucide-react";

interface BudgetStatusCardProps {
  totalBudget: number;
  spentAmount: number;
}

function BudgetStatusCard({ totalBudget, spentAmount }: BudgetStatusCardProps) {
  let status: {
    icon: React.ReactNode;
    text: string;
    colorClass: string;
    bgColorClass: string;
  };

  if (spentAmount < totalBudget * 0.8) {
    // On Track
    status = {
      icon: <CircleCheckBig color="green" size={18} />,
      text: "on track",
      colorClass: "text-green-600",
      bgColorClass: "bg-green-800 bg-opacity-40",
    };
  } else if (spentAmount >= totalBudget * 0.8 && spentAmount <= totalBudget) {
    // Need Attention
    status = {
      icon: <CircleAlert color="yellow" size={18} />,
      text: "need attention",
      colorClass: "text-yellow-300",
      bgColorClass: "bg-yellow-800 bg-opacity-40",
    };
  } else {
    // Exceeding
    status = {
      icon: <CircleX color="red" size={18} />,
      text: "exceeding",
      colorClass: "text-red-600",
      bgColorClass: "bg-red-800 bg-opacity-40",
    };
  }

  return (
    <div
      className={`w-fit flex items-center gap-2 ${status.bgColorClass} p-[5px] rounded-full`}
    >
      {status.icon}
      <p className={`text-xs ${status.colorClass}`}>{status.text}</p>
    </div>
  );
}

export default BudgetStatusCard;
