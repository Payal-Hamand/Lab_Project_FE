import React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { CircleUser, MapPinCheck, Microscope, Banknote, MapPin, Route, Download, MoreVertical } from "lucide-react"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { BOOKING_STATUS, PAYMENT_STATUS } from "@/constants/status"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const statusStyles: Record<string, string> = {
  [BOOKING_STATUS.COMPLETED]: "bg-green-50 text-green-700",
  [BOOKING_STATUS.PENDING]: "bg-primary/10 text-primary",
  [BOOKING_STATUS.CANCELLED]: "bg-red-100 text-red-700",
  [BOOKING_STATUS.RESCHEDULED]: "bg-primary/10 text-primary",
  [BOOKING_STATUS.ASSIGNED]: "bg-primary/10 text-primary",
  [BOOKING_STATUS.REACHED]: "bg-accent text-secondary",
  [BOOKING_STATUS.SAMPLE_COLLECTED]: "bg-accent text-secondary",
  [PAYMENT_STATUS.PAID]: "bg-green-50 text-green-700",
  [PAYMENT_STATUS.UNPAID]: "bg-red-100 text-red-700",
  [PAYMENT_STATUS.FAILED]: "bg-red-100 text-red-700",
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

export interface LabAssistantBooking {
  _id: string
  patientName: string
  phone: string
  test?: { title: string; price: number }
  package?: { title: string; price: number }
  bookingDate: string
  bookingTime: string
  address: string
  status: string
  paymentStatus: string
  report?: string | null
}

interface CreateLabAssistantBookingsColumnsParams {
  handleReached: (id: string) => void
  openSampleModal: (booking: LabAssistantBooking) => void
  openNavigation: (booking: LabAssistantBooking) => void
  handlePayment: (booking: LabAssistantBooking) => void
  setPreviewReport: (url: string) => void
}

export function createLabAssistantBookingsColumns({
  handleReached,
  openSampleModal,
  openNavigation,
  handlePayment,
  setPreviewReport,
}: CreateLabAssistantBookingsColumnsParams): ColumnDef<LabAssistantBooking, any>[] {
  return [
    {
      id: "patientName",
      accessorKey: "patientName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Patient" />
      ),
      cell: ({ row }) => {
        const booking = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <CircleUser className="text-primary" size={18} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">{booking.patientName}</h3>
              <p className="text-[11px] text-muted-foreground">{booking.phone}</p>
            </div>
          </div>
        )
      },
    },
    {
      id: "testTitle",
      accessorFn: (row) => row.test?.title || row.package?.title || "",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Test" />
      ),
      cell: ({ row }) => {
        const booking = row.original
        return (
          <div>
            <p className="text-sm font-medium text-foreground">
              {booking.test?.title || booking.package?.title}
            </p>
            <p className="font-mono text-xs font-bold text-primary mt-0.5">
              ₹{booking.test?.price || booking.package?.price}
            </p>
          </div>
        )
      },
    },
    {
      id: "bookingDate",
      accessorKey: "bookingDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => {
        const booking = row.original
        return (
          <div>
            <p className="text-sm font-medium text-foreground">{booking.bookingDate}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{booking.bookingTime}</p>
          </div>
        )
      },
    },
    {
      id: "address",
      accessorKey: "address",
      header: "Address",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex gap-1.5 items-start max-w-[200px]">
          <MapPin className="text-red-500 mt-0.5 flex-shrink-0" size={14} />
          <span className="text-[12px] text-muted-foreground line-clamp-2">{row.getValue("address")}</span>
        </div>
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
      cell: ({ row }) => <StatusBadge status={row.getValue("paymentStatus")} />,
    },
    {
      id: "workflow",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const booking = row.original
        const isReachDisabled = booking.status !== BOOKING_STATUS.ASSIGNED
        const isSampleDisabled = booking.status !== BOOKING_STATUS.REACHED
        const isPayDisabled =
          booking.status !== BOOKING_STATUS.SAMPLE_COLLECTED ||
          booking.paymentStatus === PAYMENT_STATUS.PAID

        return (
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center size-[38px] rounded-lg hover:bg-muted transition-colors outline-none cursor-pointer">
              <MoreVertical size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem onClick={() => openNavigation(booking)}>
                <span className="inline-flex items-center justify-center size-6 rounded-md bg-red-100 text-red-600">
                  <Route size={14} />
                </span>
                Navigate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleReached(booking._id)}
                disabled={isReachDisabled}
              >
                <span className="inline-flex items-center justify-center size-6 rounded-md bg-blue-100 text-blue-600">
                  <MapPinCheck size={14} />
                </span>
                Mark Reached
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => openSampleModal(booking)}
                disabled={isSampleDisabled}
              >
                <span className="inline-flex items-center justify-center size-6 rounded-md bg-amber-100 text-amber-600">
                  <Microscope size={14} />
                </span>
                Collect Sample
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePayment(booking)}
                disabled={isPayDisabled}
              >
                <span className="inline-flex items-center justify-center size-6 rounded-md bg-green-100 text-green-600">
                  <Banknote size={14} />
                </span>
                Collect Payment
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (booking.report) setPreviewReport(booking.report)
                }}
                disabled={!booking.report}
              >
                <span className="inline-flex items-center justify-center size-6 rounded-md bg-gray-100 text-gray-600">
                  <Download size={14} />
                </span>
                View Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
