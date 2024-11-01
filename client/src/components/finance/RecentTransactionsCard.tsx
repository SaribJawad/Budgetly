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

function RecentTransactionsCard() {
  return (
    <div className="border w-full  p-2 rounded-2xl  border-zinc-800  flex flex-col  gap-3 h-auto  lg:col-span-2">
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
      <Table className="">
        <TableHeader>
          <TableRow className="text-md  ">
            <TableHead className="min-w-[65px]  ">Date</TableHead>
            <TableHead className="w-[100px] text-right ">Amount</TableHead>
            <TableHead className="min-w-[110px] ">Payment type</TableHead>
            <TableHead className="  min-w-[130px]">Transaction type</TableHead>
            <TableHead className=" ">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="sm:sm:text-lg text-sm text-sm font-thin w-full ">
          <TableRow>
            <TableCell className="font-medium">25 jul </TableCell>
            <TableCell className="text-right">-$10</TableCell>
            <TableCell>-Other</TableCell>
            <TableCell className="text-left">Expense</TableCell>
            <TableCell className="text-left">Other</TableCell>
          </TableRow>
        </TableBody>
        <TableBody className="sm:text-lg text-sm font-thin w-full">
          <TableRow>
            <TableCell className="font-medium">25 jul </TableCell>
            <TableCell className="text-right">-$10</TableCell>
            <TableCell>-Other</TableCell>
            <TableCell className="text-left">Expense</TableCell>
            <TableCell className="text-left">Other</TableCell>
          </TableRow>
        </TableBody>
        <TableBody className="sm:text-lg text-sm font-thin w-full">
          <TableRow>
            <TableCell className="font-medium">25 jul </TableCell>
            <TableCell className="text-right">-$10</TableCell>
            <TableCell>-Other</TableCell>
            <TableCell className="text-left">Expense</TableCell>
            <TableCell className="text-left">Other</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default RecentTransactionsCard;
