import { Phone, Settings, FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'

const BookingMobileCard = ({ booking, openManageModal }) => {
  return (
    <div className="bg-white rounded-[28px] shadow-lg border border-slate-100 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600" />
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-bold text-xl text-slate-900">{booking.patientName}</h2>
            <p className="text-gray-500 mt-1 flex items-center gap-1">
              <Phone size={14} /> {booking.phone}
            </p>
          </div>
          <Badge status={booking.status}>{booking.status}</Badge>
        </div>

        <div className="mt-4 bg-slate-50 rounded-2xl p-4">
          <p className="text-xs text-gray-500 mb-2">Test / Package</p>
          <div className="flex justify-between items-center gap-4">
            <h3 className="font-bold text-slate-800 text-lg">
              {booking?.test?.title || booking?.package?.title || 'N/A'}
            </h3>
            <p className="text-green-600 font-bold text-xl whitespace-nowrap">
              ₹{booking?.test?.price || booking?.package?.price || 0}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-purple-50 rounded-2xl p-4">
            <p className="text-xs text-gray-500">Date</p>
            <h3 className="font-semibold text-purple-700 mt-1">{booking.bookingDate}</h3>
          </div>
          <div className="bg-orange-50 rounded-2xl p-4">
            <p className="text-xs text-gray-500">Time</p>
            <h3 className="font-semibold text-orange-700 mt-1">{booking.bookingTime}</h3>
          </div>
        </div>

        <div className="mt-4 bg-green-50 rounded-2xl p-4">
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Payment Status</span>
            <Badge
              status={
                booking.paymentStatus === PAYMENT_STATUS.PAID
                  ? PAYMENT_STATUS.PAID
                  : PAYMENT_STATUS.UNPAID
              }
            >
              {booking.paymentStatus}
            </Badge>
          </div>
        </div>

        <div className="mt-4 bg-slate-50 rounded-2xl p-4">
          <p className="text-xs text-gray-500">Service Address</p>
          <p className="text-slate-700 mt-2">
            {booking.flatNo}, {booking.address}, {booking.city}
            {' - '}
            {booking.pincode}
          </p>
        </div>

        {booking.report && (
          <a
            href={booking.report}
            target="_blank"
            rel="noreferrer"
            className="mt-4 w-full flex justify-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-medium"
          >
            <FileText className="inline mr-2" size={16} />
            Download Report
          </a>
        )}

        {booking.status !== BOOKING_STATUS.COMPLETED &&
          booking.status !== BOOKING_STATUS.CANCELLED && (
            <Button onClick={() => openManageModal(booking)} fullWidth variant="warning">
              <Settings className="inline mr-2" size={16} />
              Manage Booking
            </Button>
          )}
      </div>
    </div>
  )
}

export default BookingMobileCard
