import React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Settings } from "lucide-react"
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

export interface PatientBooking {
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
}

interface CreatePatientBookingsColumnsParams {
  openManageModal: (booking: PatientBooking) => void
}

export function createPatientBookingsColumns({
  openManageModal,
}: CreatePatientBookingsColumnsParams): ColumnDef<PatientBooking, any>[] {
  return [
    {
      id: "testTitle",
      accessorFn: (row) => row.test?.title || row.package?.title || "",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Test/Package" />
      ),
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-foreground block max-w-[200px] truncate">
          {row.original.test?.title || row.original.package?.title || "N/A"}
        </span>
      ),
    },
    {
      id: "bookingDate",
      accessorKey: "bookingDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.getValue("bookingDate")}</span>
      ),
    },
    {
      id: "bookingTime",
      accessorKey: "bookingTime",
      header: "Time",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.getValue("bookingTime")}</span>
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
      id: "paymentStatus",
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Payment" />
      ),
      cell: ({ row }) => <PaymentBadge status={row.getValue("paymentStatus")} />,
    },
    {
      id: "manage",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const booking = row.original
        const canManage =
          booking.status !== BOOKING_STATUS.COMPLETED &&
          booking.status !== BOOKING_STATUS.CANCELLED
        return canManage ? (
          <button
            onClick={() => openManageModal(booking)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning hover:bg-warning/90 text-white text-xs font-semibold transition-all"
          >
            <Settings size={14} />
            Manage
          </button>
        ) : booking.status === BOOKING_STATUS.CANCELLED ? (
          <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-md text-[11px] font-semibold">
            Cancelled
          </span>
        ) : null
      },
    },
  ]
}
