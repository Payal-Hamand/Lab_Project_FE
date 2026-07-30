import React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Download, MapPin, Pencil } from "lucide-react"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { BOOKING_STATUS } from "@/constants/status"

const statusStyles: Record<string, string> = {
  [BOOKING_STATUS.COMPLETED]: "bg-green-50 text-green-700",
  [BOOKING_STATUS.PENDING]: "bg-primary/10 text-primary",
  [BOOKING_STATUS.CANCELLED]: "bg-red-100 text-red-700",
  [BOOKING_STATUS.RESCHEDULED]: "bg-primary/10 text-primary",
  [BOOKING_STATUS.ASSIGNED]: "bg-primary/10 text-primary",
  [BOOKING_STATUS.REACHED]: "bg-accent text-secondary",
  [BOOKING_STATUS.SAMPLE_COLLECTED]: "bg-accent text-secondary",
}

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold inline-block ${
      statusStyles[status] || "bg-primary/10 text-muted-foreground"
    }`}
  >
    {status}
  </span>
)

const paymentStyles: Record<string, string> = {
  Paid: "bg-green-50 text-green-700",
  Unpaid: "bg-red-100 text-red-700",
  Failed: "bg-red-100 text-red-700",
}

const PaymentBadge = ({ status }: { status: string }) => (
  <span
    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold inline-block ${
      paymentStyles[status] || "bg-primary/10 text-muted-foreground"
    }`}
  >
    {status}
  </span>
)

export interface AdminBooking {
  _id: string
  patientName: string
  phone: string
  test?: { title: string; price: number }
  package?: { title: string; price: number }
  bookingDate: string
  bookingTime: string
  status: string
  paymentStatus: string
  report?: string | null
  labOwner?: { name: string; labAddress: string } | null
}

interface CreateAdminBookingsColumnsParams {
  openEditModal: (booking: AdminBooking) => void
  setPreviewReport: (url: string) => void
}

export function createAdminBookingsColumns({
  openEditModal,
  setPreviewReport,
}: CreateAdminBookingsColumnsParams): ColumnDef<AdminBooking, any>[] {
  return [
    {
      id: "testTitle",
      accessorFn: (row) => row.test?.title || row.package?.title || "",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Test/Package" />
      ),
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-foreground">
          {row.original.test?.title || row.original.package?.title}
        </span>
      ),
    },
    {
      id: "patientName",
      accessorKey: "patientName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Patient" />
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-semibold text-foreground text-sm">
            {row.original.patientName}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {row.original.phone}
          </div>
        </div>
      ),
    },
    {
      id: "bookingDate",
      accessorKey: "bookingDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.getValue("bookingDate")}
        </span>
      ),
    },
    {
      id: "bookingTime",
      accessorKey: "bookingTime",
      header: "Time",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.getValue("bookingTime")}
        </span>
      ),
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      id: "labOwner",
      header: "Assigned Lab",
      enableSorting: false,
      cell: ({ row }) => {
        const lab = row.original.labOwner
        return (
          <div>
            <div className="text-sm font-semibold text-foreground">
              {lab?.name || (
                <span className="text-muted-foreground font-normal">
                  Not Assigned
                </span>
              )}
            </div>
            {lab?.labAddress && (
              <div className="group/tooltip relative w-max mt-0.5">
                <p className="text-xs text-muted-foreground cursor-pointer flex items-center max-w-[180px] truncate">
                  <MapPin size={12} className="mr-1 shrink-0" />
                  {lab.labAddress}
                </p>
                <div className="absolute hidden group-hover/tooltip:block z-50 bg-foreground text-background text-xs rounded-lg p-2.5 w-64 left-0 top-5 shadow-xl">
                  {lab.labAddress}
                </div>
              </div>
            )}
          </div>
        )
      },
    },
    {
      id: "paymentStatus",
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Payment" />
      ),
      cell: ({ row }) => (
        <PaymentBadge status={row.getValue("paymentStatus")} />
      ),
    },
    {
      id: "report",
      header: "Report",
      enableSorting: false,
      cell: ({ row }) => {
        const booking = row.original
        if (booking.report) {
          return (
            <button
              onClick={() => setPreviewReport(booking.report!)}
              className="inline-flex items-center gap-1.5 bg-success hover:bg-success/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
            >
              <Download size={14} />
              View Report
            </button>
          )
        }
        return (
          <span className="text-muted-foreground text-sm">Pending</span>
        )
      },
    },
    {
      id: "actions",
      header: "Edit",
      enableSorting: false,
      cell: ({ row }) => {
        const booking = row.original
        const isDisabled =
          booking.status === BOOKING_STATUS.COMPLETED ||
          booking.status === BOOKING_STATUS.CANCELLED
        return (
          <button
            onClick={() => openEditModal(booking)}
            disabled={isDisabled}
            className="inline-flex items-center gap-1.5 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Pencil size={14} />
            Edit Lab
          </button>
        )
      },
    },
  ]
}
