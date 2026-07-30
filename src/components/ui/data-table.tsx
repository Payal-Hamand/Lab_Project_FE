import * as React from "react"
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/ui/data-table-pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSize?: number
  searchColumn?: string
  searchPlaceholder?: string
  enablePagination?: boolean
  enableSorting?: boolean
  enableRowSelection?: boolean
  className?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  searchColumn,
  searchPlaceholder = "Search...",
  enablePagination = true,
  enableSorting = true,
  enableRowSelection = false,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(enablePagination && {
      getPaginationRowModel: getPaginationRowModel(),
      initialState: { pagination: { pageSize } },
    }),
    ...(enableSorting && {
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: setSorting,
    }),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    ...(enableRowSelection && {
      onRowSelectionChange: setRowSelection,
    }),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      ...(enableRowSelection && { rowSelection }),
    },
  })

  return (
    <div className={className}>
      {searchColumn && (
        <div className="flex items-center py-4">
          <input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 max-w-sm"
          />
        </div>
      )}
      <div className="rounded-md border">
        <Table className="min-w-[900px]">
          <TableHeader className="bg-primary/10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs font-semibold text-muted-foreground">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {enablePagination && (
        <div className="py-4">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  )
}
