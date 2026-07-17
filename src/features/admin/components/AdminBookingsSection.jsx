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
    <div ref={tableRef} className="bg-white rounded-[35px] shadow-sm mt-10 p-5 md:p-8">
      <DashboardSectionHeader title="Recent Bookings" subtitle="Latest patient booking activity" />
      {loading ? (
        <Spinner />
      ) : fetchError ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-medium">{fetchError}</p>
          <Button onClick={onRetry} variant="outline" className="mt-4">
            Retry
          </Button>
        </div>
      ) : filteredBookings.length === 0 ? (
        <EmptyState text="No Bookings Found" />
      ) : (
        <>
          <div className="hidden lg:block overflow-x-auto">
            <BookingsTable
              bookings={filteredBookings}
              isAdmin={true}
              openEditModal={openEditModal}
            />
          </div>
          <div className="lg:hidden grid gap-4">
            {filteredBookings.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-[28px] shadow-lg border border-slate-100 overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600" />
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-bold text-lg text-slate-900">{item.patientName}</h2>
                      <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                        <Phone size={14} /> {item.phone}
                      </p>
                    </div>
                    <Badge status={item.status}>{item.status}</Badge>
                  </div>
                  <div className="mt-4 bg-purple-50 rounded-2xl p-4">
                    <p className="text-xs text-gray-500">Assigned Lab</p>
                    <h3 className="font-semibold text-purple-700 mt-1">
                      {item.labOwner?.name || 'Not Assigned'}
                    </h3>
                    <p
                      title={item.labOwner?.labAddress}
                      className="text-sm text-gray-600 mt-2 truncate"
                    >
                      <MapPin size={14} className="inline mr-1" />{' '}
                      {item.labOwner?.labAddress || 'No Address'}
                    </p>
                  </div>
                  <div className="mt-4 bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs text-gray-500 mb-2">Test / Package</p>
                    <div className="flex justify-between items-center gap-3">
                      <h3 className="font-bold text-slate-800 flex-1">
                        {item?.test?.title || item?.package?.title}
                      </h3>
                      <span className="text-green-600 font-bold text-lg">
                        ₹{item?.test?.price || item?.package?.price}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-purple-50 rounded-2xl p-4">
                      <p className="text-xs text-gray-500">Date</p>
                      <h3 className="font-semibold text-purple-700 mt-1">{item.bookingDate}</h3>
                    </div>
                    <div className="bg-orange-50 rounded-2xl p-4">
                      <p className="text-xs text-gray-500">Time</p>
                      <h3 className="font-semibold text-orange-700 mt-1">{item.bookingTime}</h3>
                    </div>
                  </div>
                  <div className="mt-4 bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-slate-700 mt-2 text-sm">
                      {item.flatNo}, {item.address}, {item.city} - {item.pincode}
                    </p>
                  </div>
                  <div className="mt-4 bg-green-50 rounded-2xl p-4 flex justify-between items-center">
                    <p className="text-xs text-gray-500">Payment Status</p>
                    <Badge status={item.paymentStatus}>{item.paymentStatus}</Badge>
                  </div>
                  <div className="mt-4">
                    {item.status === BOOKING_STATUS.COMPLETED ? (
                      <div className="w-full bg-green-100 text-green-700 py-3 rounded-2xl text-center font-semibold">
                        <CircleCheckBig size={16} className="inline mr-1" />
                        Booking Completed
                      </div>
                    ) : (
                      <Button onClick={() => openEditModal(item)} fullWidth>
                        <Pencil size={14} className="inline mr-1" />
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
