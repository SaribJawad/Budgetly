import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  totalCount: number;
}

export function DataTable<TData>({
  columns,
  data,
  totalCount,
}: DataTableProps<TData>) {
  const queryClient = useQueryClient();
  const { pageNum = "1", limit = "10" } = useParams();
  const navigate = useNavigate();

  const [pageIndex, setPageIndex] = useState(Number(pageNum) - 1);

  const [pageSize, setPageSize] = useState(Number(limit));

  const [rowSelection, setRowSelection] = useState({});

  // invalidate data whenever page or limit changes
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["allTransactions", pageNum, pageSize],
    });
    navigate(`/transactions/${pageIndex + 1}/${pageSize}`, {
      replace: true,
    });
  }, [pageIndex, pageSize]);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
    state: {
      rowSelection,
      pagination: { pageIndex, pageSize },
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className=" w-full  rounded-2xl grid grid-cols-1">
      <div className="rounded-md border border-zinc-800">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-zinc-800 sm:text-md text-sm w-fit"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-zinc-800 sm:text-lg text-sm"
                  style={
                    row.getIsSelected() ? { backgroundColor: "#27272A" } : {}
                  }
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No transactions to see.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className="text-sm h-6 bg-black border border-zinc-800 hover:bg-[#917FFF] hover:text-white"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <span className="text-sm">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            className="text-sm h-6 bg-black border border-zinc-800 hover:bg-[#917FFF] hover:text-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Select
            defaultValue={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger
              className="w-fit flex items-center gap-2"
              style={{ outline: "none", boxShadow: "none" }}
            >
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
