import React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import CopyIcon from "@/components/ui/CopyIcon"

export interface LabOwner {
  _id: string
  name: string
  email: string
  role: string
  servicePincodes?: string[]
  labAddress?: string
}

export const labOwnerColumns: ColumnDef<LabOwner, any>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }) => {
      const owner = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm shrink-0">
            {owner.name?.charAt(0)}
          </div>
          <div>
            <h3 className="text-xs font-medium text-foreground">{owner.name}</h3>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              ID: {owner._id.slice(-6)}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">{row.getValue("email")}</span>
    ),
  },
  {
    id: "labAddress",
    accessorKey: "labAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ table, row }) => {
      const address = row.getValue<string>("labAddress")
      if (!address) return <p className="text-xs text-muted-foreground">—</p>

      const isLastRow = row.index === table.getRowModel().rows.length - 1

      return (
        <div className="flex items-center gap-1.5 w-max">
          <div className="group/tooltip relative">
            <p className="w-44 truncate text-xs text-muted-foreground cursor-pointer">
              {address}
            </p>
            <div
              className={`absolute hidden group-hover/tooltip:block z-[9999] bg-foreground text-background text-xs rounded-lg p-2.5 w-max max-w-[80vw] whitespace-normal break-words left-0 shadow-xl ${
                isLastRow ? "bottom-5" : "top-5"
              }`}
            >
              {address}
            </div>
          </div>
          <CopyIcon text={address} />
        </div>
      )
    },
  },
  {
    id: "role",
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => (
      <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize">
        {row.getValue("role")}
      </span>
    ),
  },
  {
    id: "servicePincodes",
    accessorKey: "servicePincodes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service Areas" />
    ),
    cell: ({ row }) => {
      const pincodes = row.getValue("servicePincodes") as string[] | undefined
      return (
        <div className="flex flex-wrap gap-1.5">
          {pincodes?.map((pin, index) => (
            <span
              key={index}
              className="bg-primary/10 border border-border px-2 py-0.5 rounded-full text-[10px] text-muted-foreground"
            >
              {pin}
            </span>
          ))}
        </div>
      )
    },
  },
  {
    id: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: () => (
      <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-[10px] font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
        Active
      </div>
    ),
  },
]
