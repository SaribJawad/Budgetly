import { columns } from "@/components/data-display/columns";
import DataTable from "@/components/data-display/DataTable";
import Header from "@/components/navigation/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import CreateTransactionPopup from "@/components/popups/CreateTransactionPopup";
import { DateFilterWithRange } from "@/components/filters/DateFilterWithRange";

export type Payments = {
  date: string;
  amount: number;
  paymentType: string;
  transactionType: "Income" | "Expense" | "Transfer";
  category: string;
};

function TransactionsPage() {
  // hard coded temp
  const payments: Payments[] = [
    {
      date: "2024-06-12",
      amount: 200,
      paymentType: "Other",
      transactionType: "Income",
      category: "Other",
    },
    {
      date: "2024-06-12",
      amount: 200,
      paymentType: "Other",
      transactionType: "Income",
      category: "Other",
    },
    {
      date: "2024-06-12",
      amount: 200,
      paymentType: "Other",
      transactionType: "Income",
      category: "Other",
    },
    {
      date: "2024-06-12",
      amount: 200,
      paymentType: "Other",
      transactionType: "Income",
      category: "Other",
    },
    {
      date: "2024-06-12",
      amount: 200,
      paymentType: "Other",
      transactionType: "Income",
      category: "Other",
    },
    {
      date: "2024-06-12",
      amount: 200,
      paymentType: "Other",
      transactionType: "Income",
      category: "Other",
    },
    {
      date: "2024-06-12",
      amount: 200,
      paymentType: "Other",
      transactionType: "Income",
      category: "Other",
    },
    {
      date: "2024-06-12",
      amount: 200,
      paymentType: "Other",
      transactionType: "Income",
      category: "Other",
    },
    {
      date: "2024-06-12",
      amount: 200,
      paymentType: "Other",
      transactionType: "Income",
      category: "Other",
    },
    {
      date: "2024-06-12",
      amount: 200,
      paymentType: "Other",
      transactionType: "Income",
      category: "Other",
    },
    {
      date: "2024-06-12",
      amount: 200,
      paymentType: "Other",
      transactionType: "Income",
      category: "Other",
    },
    {
      date: "2024-06-12",
      amount: 200,
      paymentType: "Other",
      transactionType: "Income",
      category: "Other",
    },
  ];

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [togglePopup, setTogglePopup] = useState<boolean>(false);

  const closePopup = (): void => {
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
    <div className={" w-full h-full p-2  flex flex-col gap-3  "}>
      <Header heading={"Transactions"} note={"Overview of your activities"} />

      <div className="flex items-center justify-between w-full ">
        <div className=" ">
          <DateFilterWithRange
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>

        <Button
          onClick={() => setTogglePopup((prev) => !prev)}
          size="sm"
          className="bg-[#8470FF] hover:bg-[#6C5FBC] hover:text-white  border-zinc-800 w-auto text-md font-medium"
          variant="outline"
        >
          Add new
        </Button>
        {togglePopup && <CreateTransactionPopup onClose={closePopup} />}
      </div>

      <DataTable columns={columns} data={payments} />
    </div>
  );
}

export default TransactionsPage;
