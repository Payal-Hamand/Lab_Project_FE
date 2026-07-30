import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { createLabOwnerBookingsColumns } from '@/features/lab-owner/columns/lab-owner-bookings.columns'

const LabOwnerBookingsTable = ({
  filteredBookings,
  assistants,
  handleAssignAssistant,
  selectedReport,
  setSelectedReport,
  uploadingReport,
  handleUploadReport,
}) => {
  const columns = React.useMemo(
    () =>
      createLabOwnerBookingsColumns({
        assistants,
        handleAssignAssistant,
        selectedReport,
        setSelectedReport,
        uploadingReport,
        handleUploadReport,
      }),
    [assistants, handleAssignAssistant, selectedReport, setSelectedReport, uploadingReport, handleUploadReport]
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

export default LabOwnerBookingsTable
