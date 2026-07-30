import React, { useState } from 'react'
import { DashboardSectionHeader, EmptyState } from '@/components/Dashboard'
import { DataTable } from '@/components/ui/data-table'
import { createAdminBookingsColumns } from '@/features/admin/columns/admin-bookings.columns'
import { Spinner } from '@/components/ui/Loader'
import Button from '@/components/ui/Button'
import ReportViewerModal from '@/components/Dashboard/ReportViewerModal'

const AdminBookingsSection = ({
  loading,
  fetchError,
  onRetry,
  openEditModal,
  filteredBookings,
  tableRef,
}) => {
  const [previewReport, setPreviewReport] = useState(null)

  const columns = React.useMemo(
    () => createAdminBookingsColumns({ openEditModal, setPreviewReport }),
    [openEditModal]
  )

  return (
    <div ref={tableRef} className="bg-white border border-border rounded-xl shadow-card mt-8 p-5 md:p-6">
      <DashboardSectionHeader title="Recent Bookings" subtitle="Latest patient booking activity" />
      {loading ? (
        <Spinner />
      ) : fetchError ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center mt-4">
          <p className="text-red-600 text-xs font-medium">{fetchError}</p>
          <Button onClick={onRetry} variant="outline" className="mt-3" size="sm">
            Retry
          </Button>
        </div>
      ) : filteredBookings.length === 0 ? (
        <EmptyState text="No Bookings Found" />
      ) : (
        <>
          <div className="mt-4 overflow-x-auto">
            <DataTable
              columns={columns}
              data={filteredBookings}
              enablePagination={true}
              enableSorting={true}
              pageSize={10}
            />
          </div>
        </>
      )}

      <ReportViewerModal
        isOpen={!!previewReport}
        onClose={() => setPreviewReport(null)}
        reportUrl={previewReport}
      />
    </div>
  )
}

export default AdminBookingsSection
