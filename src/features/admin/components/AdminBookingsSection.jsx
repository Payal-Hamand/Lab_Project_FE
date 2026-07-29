import React from 'react'
import { DashboardSectionHeader, BookingsTable, EmptyState } from '@/components/Dashboard'
import { Spinner } from '@/components/ui/Loader'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Phone, MapPin, CircleCheckBig, Pencil } from 'lucide-react'
import { BOOKING_STATUS } from '@/constants/status'

const AdminBookingsSection = ({
  loading,
  fetchError,
  onRetry,
  openEditModal,
  filteredBookings,
  tableRef,
}) => {
  return (
    <div ref={tableRef} className="bg-white border border-[#C5DBF0] rounded-xl shadow-card mt-8 p-5 md:p-6">
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
          <div className="hidden lg:block overflow-x-auto mt-4">
            <BookingsTable
              bookings={filteredBookings}
              isAdmin={true}
              openEditModal={openEditModal}
            />
          </div>
          <div className="lg:hidden grid gap-3 mt-4">
            {filteredBookings.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-[#C5DBF0] rounded-[10px] overflow-hidden"
              >
                <div className="h-1.5 bg-[#1A6FD4]" />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xs font-medium text-[#0A2240]">{item.patientName}</h2>
                      <p className="text-[10px] text-[#4A6A8A] mt-0.5 flex items-center gap-1">
                        <Phone size={11} /> {item.phone}
                      </p>
                    </div>
                    <Badge status={item.status}>{item.status}</Badge>
                  </div>

                  <div className="mt-3 bg-[#EEF6FF] rounded-lg p-3">
                    <p className="text-[10px] text-[#4A6A8A]">Assigned Lab</p>
                    <h3 className="text-xs font-medium text-[#0A2240] mt-0.5">
                      {item.labOwner?.name || 'Not Assigned'}
                    </h3>
                    <p title={item.labOwner?.labAddress} className="text-[10px] text-[#4A6A8A] mt-0.5 truncate">
                      <MapPin size={11} className="inline mr-1" />{' '}
                      {item.labOwner?.labAddress || 'No Address'}
                    </p>
                  </div>

                  <div className="mt-2 bg-[#E8F4FF] rounded-lg p-3">
                    <p className="text-[10px] text-[#4A6A8A] mb-1">Test / Package</p>
                    <div className="flex justify-between items-center gap-3">
                      <h3 className="text-xs font-medium text-[#0A2240] flex-1">
                        {item?.test?.title || item?.package?.title}
                      </h3>
                      <span className="font-mono font-bold text-xs text-[#1A6FD4]">
                        ₹{item?.test?.price || item?.package?.price}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-[#EEF6FF] rounded-lg p-2.5">
                      <p className="text-[10px] text-[#4A6A8A]">Date</p>
                      <h3 className="text-xs font-medium text-[#0A2240] mt-0.5">{item.bookingDate}</h3>
                    </div>
                    <div className="bg-[#EEF6FF] rounded-lg p-2.5">
                      <p className="text-[10px] text-[#4A6A8A]">Time</p>
                      <h3 className="text-xs font-medium text-[#0A2240] mt-0.5">{item.bookingTime}</h3>
                    </div>
                  </div>

                  <div className="mt-2 bg-[#EEF6FF] rounded-lg p-3 flex justify-between items-center">
                    <p className="text-[10px] text-[#4A6A8A]">Payment Status</p>
                    <Badge status={item.paymentStatus}>{item.paymentStatus}</Badge>
                  </div>

                  <div className="mt-3">
                    {item.status === BOOKING_STATUS.COMPLETED ? (
                      <div className="w-full bg-green-50 text-green-700 py-2 rounded-lg text-center text-xs font-medium">
                        <CircleCheckBig size={12} className="inline mr-1" />
                        Booking Completed
                      </div>
                    ) : (
                      <Button onClick={() => openEditModal(item)} fullWidth size="sm">
                        <Pencil size={12} className="inline mr-1" />
                        Edit Assigned Lab
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default AdminBookingsSection
