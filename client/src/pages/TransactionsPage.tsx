import { columns } from "@/components/data-display/columns";
import DataTable from "@/components/data-display/DataTable";
import Header from "@/components/navigation/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import CreateTransactionPopup from "@/components/popups/CreateTransactionPopup";
import { DateFilterWithRange } from "@/components/filters/DateFilterWithRange";
import useGetAllTranscations from "@/custom-hooks/useGetAllTransactions";
import { useAppSelector } from "@/app/hook";
import { selectAllTransactions } from "@/features/transactions/transactionsSlice";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

function TransactionsPage() {
  useGetAllTranscations();
  const {
    data,
    status,
    totalTransactions,
    error,
    pagination: { currentPage, pageSize, totalPages },
    loadedPages,
  } = useAppSelector(selectAllTransactions);

  // console.log("data", data[currentPage]);
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

      {status === "loading" && (
        <div className="h-full w-full flex items-center justify-center">
          <LoadingSpinner size={50} />
        </div>
      )}
      {status === "success" && (
        <DataTable
          columns={columns}
          data={data[currentPage]}
          totalCount={data[currentPage].length || 0}
        />
      )}
    </div>
  );
}

export default TransactionsPage;
