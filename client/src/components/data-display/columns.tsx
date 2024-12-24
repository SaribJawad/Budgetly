import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { Transaction } from "@/@types/Types";
import useDeleteTransactions from "@/custom-hooks/transactions/useDeleteTransaction";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount;

      return <span>{formatCurrency(amount)}</span>;
    },
  },
  {
    accessorKey: "paymentType",
    header: "Payment type",
  },
  {
    accessorKey: "transactionType",
    header: "type",
    cell: ({ row }) => {
      const type = row.original.transactionType;
      const bgColor =
        type === "Income"
          ? "text-green-400 "
          : type === "Expense"
          ? "text-red-400"
          : "text-purple-400";
      return <span className={`px-2 py-1 rounded-md ${bgColor}`}>{type}</span>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const {
        mutateAsync: deleteTransaction,
        isPending: isDeleteTransactionPending,
      } = useDeleteTransactions();

      const handleDelete = async () => {
        const paymentId = row.original._id;
        await deleteTransaction(paymentId);
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              disabled={isDeleteTransactionPending}
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-[#27272A] hover:text-white outline-none border-none"
            >
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-black text-white border-zinc-800 "
            align="center"
          >
            <DropdownMenuItem
              disabled={isDeleteTransactionPending}
              onClick={handleDelete}
              className="text-xs focus:bg-black focus:text-white cursor-pointer"
            >
              {isDeleteTransactionPending ? <LoadingSpinner /> : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
