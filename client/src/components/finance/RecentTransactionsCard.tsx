import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/app/hook";
import { selectRecentTransaction } from "@/features/transactions/transactionsSlice";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import EmptySection from "../ui/EmptySection";

function RecentTransactionsCard() {
  const { data: recentTransations, status } = useAppSelector(
    selectRecentTransaction
  );

  return (
    <div className="border w-full  min-h-[285px] h-fit  p-2 rounded-2xl  border-zinc-800  flex flex-col  gap-3   lg:col-span-2">
      <div className="flex items-start justify-between">
        <h1 className="font-normal text-xl">Recent transactions</h1>
        <Link
          to=""
          className="flex text-sm items-center justify-around  border border-zinc-800 py-2 px-3 rounded-full gap-1 hover:border-white"
        >
          See all{" "}
          <p>
            <ChevronRight size={13} />
          </p>
        </Link>
      </div>
      {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner size={40} />
        </div>
      ) : recentTransations.length >= 1 ? (
        <Table className="">
          <TableHeader>
            <TableRow className="text-md  ">
              <TableHead className="min-w-[65px]  ">Date</TableHead>
              <TableHead className="w-[100px] text-right ">Amount</TableHead>
              <TableHead className="min-w-[110px] ">Payment type</TableHead>
              <TableHead className="  min-w-[130px]">
                Transaction type
              </TableHead>
              <TableHead className=" ">Category</TableHead>
            </TableRow>
          </TableHeader>
          {recentTransations.map((transaction) => (
            <TableBody
              key={transaction._id}
              className="sm:sm:text-lg text-sm  font-thin w-full "
            >
              <TableRow>
                <TableCell className="font-medium">
                  {transaction.date}
                </TableCell>
                <TableCell className="text-right">
                  {transaction.amount}
                </TableCell>
                <TableCell>{transaction.paymentType}</TableCell>
                <TableCell className="text-left">
                  {transaction.transactionType}
                </TableCell>
                <TableCell className="text-left">
                  {transaction.category}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      ) : (
        <EmptySection
          title="No Transactions Found"
          description="You currently don't have any transactions."
        />
      )}
    </div>
  );
}

export default RecentTransactionsCard;
