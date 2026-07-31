import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { createLabAssistantBookingsColumns } from '@/features/lab-assistant/columns/lab-assistant-bookings.columns'

const LabAssistantBookingsTable = ({
  filteredBookings,
  handleReached,
  openSampleModal,
  openNavigation,
  handlePayment,
  setPreviewReport,
}) => {
  const columns = React.useMemo(
    () =>
      createLabAssistantBookingsColumns({
        handleReached,
        openSampleModal,
        openNavigation,
        handlePayment,
        setPreviewReport,
      }),
    [handleReached, openSampleModal, openNavigation, handlePayment, setPreviewReport]
  )

  return (
    <div className="w-full bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredBookings}
          enablePagination={true}
          enableSorting={true}
          pageSize={10}
        />
      </div>
    </div>
  )
}

export default LabAssistantBookingsTable
