import React, { useRef } from 'react'
import { Download, UploadCloud } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { createLabOwnerBookingsColumns } from '@/features/lab-owner/columns/lab-owner-bookings.columns'
import { PAYMENT_STATUS } from '@/constants/status'

const LabOwnerBookingsTable = ({
  filteredBookings,
  assistants,
  handleAssignAssistant,
  setSelectedReport,
  uploadingReport,
  handleUploadReport,
  setPreviewReport,
}) => {
  const fileInputRef = useRef(null)
  const selectedBookingIdRef = useRef(null)

  const columns = React.useMemo(
    () =>
      createLabOwnerBookingsColumns({
        assistants,
        handleAssignAssistant,
      }),
    [assistants, handleAssignAssistant]
  )

  const handleUploadClick = (bookingId) => {
    selectedBookingIdRef.current = bookingId
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    const bookingId = selectedBookingIdRef.current
    if (file && bookingId) {
      setSelectedReport((prev) => ({ ...prev, [bookingId]: file }))
      handleUploadReport(bookingId)
    }
    e.target.value = ''
  }

  const actions = React.useMemo(
    () => [
      {
        label: 'View Report',
        icon: <Download size={14} />,
        iconColor: 'bg-blue-100 text-blue-600',
        onClick: (row) => {
          if (row.report) setPreviewReport(row.report)
        },
        disabled: (row) => !row.report,
      },
      {
        label: 'Upload Report',
        icon: <UploadCloud size={14} />,
        iconColor: 'bg-green-100 text-green-600',
        onClick: (row) => handleUploadClick(row._id),
        disabled: (row) =>
          row.paymentStatus !== PAYMENT_STATUS.PAID || !!row.report || uploadingReport[row._id],
        separator: true,
      },
    ],
    [setPreviewReport, uploadingReport]
  )

  return (
    <div className="w-full bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredBookings}
          enablePagination={true}
          enableSorting={true}
          pageSize={10}
          actions={actions}
        />
      </div>
    </div>
  )
}

export default LabOwnerBookingsTable
