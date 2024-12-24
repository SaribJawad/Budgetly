import { columns } from "@/components/data-display/columns";
import DataTable from "@/components/data-display/DataTable";
import Header from "@/components/navigation/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import CreateTransactionPopup from "@/components/popups/CreateTransactionPopup";
import { DateFilterWithRange } from "@/components/filters/DateFilterWithRange";

import { useAppSelector } from "@/app/hook";
import {
  selectAllTransactions,
  selectFilteredTransactions,
} from "@/features/transactions/transactionsSlice";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetFilteredTransactions from "@/custom-hooks/transactions/useGetFilteredTransactions";
import EmptySection from "@/components/ui/EmptySection";
import { formatCurrency } from "@/lib/utils";

function TransactionsPage() {
  const { mutateAsync: fetchFilterTransactions } = useGetFilteredTransactions();

  const {
    data,
    status: allTransactionStatus,
    totalTransactions,
    error,
    pagination: { currentPage, pageSize, totalPages },
    loadedPages,
  } = useAppSelector(selectAllTransactions);

  const {
    data: filteredTransactions,
    status: filteredTransactionsStatus,
    error: filteredTransactionsError,
    filterCriteria,
  } = useAppSelector(selectFilteredTransactions);

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [togglePopup, setTogglePopup] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"All" | "Income" | "Expense">("All");

  const closePopup = (): void => {
    setTogglePopup(false);
  };

  // filter transaction fetch
  const filterTransactions = async () => {
    const filterParams: any = {};

    if (dateRange?.from && dateRange?.to) {
      filterParams.fromDate = dateRange.from.toString();
      filterParams.toDate = dateRange.to.toString();
    }

    if (sortBy !== "All") {
      filterParams.transactionType = sortBy;
    }

    if (Object.keys(filterParams).length > 0) {
      await fetchFilterTransactions(filterParams);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchFilteredTransaction = async () => {
      if (isMounted) {
        await filterTransactions();
      }
    };

    fetchFilteredTransaction();

    return () => {
      isMounted = false;
    };
  }, [sortBy, dateRange]);

  useEffect(() => {
    if (togglePopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [togglePopup]);

  const displayData =
    sortBy === "All" && !dateRange
      ? data && data[currentPage]
        ? data[currentPage]
        : []
      : filteredTransactions || [];

  const totalCount =
    sortBy === "All"
      ? data && data[currentPage]
        ? data[currentPage].length
        : 0
      : filteredTransactions?.length || 0;

  return (
    <div className={" w-full h-full p-2  flex flex-col gap-3  "}>
      <Header heading={"Transactions"} note={"Overview of your activities"} />

      <div className="flex items-center justify-between w-full ">
        {sortBy.includes("All") && (
          <div className=" ">
            <DateFilterWithRange
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
        )}

        <div className="flex items-center gap-3  ">
          <Select
            value={sortBy}
            onValueChange={(value: "All" | "Income" | "Expense") =>
              setSortBy(value)
            }
          >
            <SelectTrigger
              className="bg-black flex gap-5 hover:bg-zinc-800 hover:text-white  border-zinc-800 w-auto text-md font-medium py-4 "
              style={{ outline: "none", boxShadow: "none" }}
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => setTogglePopup((prev) => !prev)}
            size="sm"
            className="bg-[#8470FF] hover:bg-[#6C5FBC] hover:text-white  border-zinc-800 w-auto text-md font-medium"
            variant="outline"
          >
            Add new
          </Button>
        </div>

        {togglePopup && <CreateTransactionPopup onClose={closePopup} />}
      </div>

      {allTransactionStatus === "loading" ||
      filteredTransactionsStatus === "loading" ? (
        <div className="h-full w-full flex items-center justify-center">
          <LoadingSpinner size={50} />
        </div>
      ) : allTransactionStatus === "success" && displayData ? (
        <DataTable
          columns={columns}
          data={displayData}
          totalCount={totalCount}
          sortBy={sortBy}
        />
      ) : (
        <EmptySection
          title="No Transactions Found"
          description="Start adding transactions to see them here."
        />
      )}
    </div>
  );
}

export default TransactionsPage;
