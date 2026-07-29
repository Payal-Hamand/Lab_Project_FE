import { Phone, Settings, FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'

const BookingMobileCard = ({ booking, openManageModal }) => {
  return (
    <div className="bg-white border border-[#C5DBF0] rounded-[10px] overflow-hidden">
      {/* Status strip */}
      <div
        className={`h-1.5 ${
          booking.status === BOOKING_STATUS.COMPLETED
            ? 'bg-green-600'
            : booking.status === BOOKING_STATUS.SAMPLE_COLLECTED
            ? 'bg-[#378ADD]'
            : 'bg-[#1A6FD4]'
        }`}
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xs font-medium text-[#0A2240]">{booking.patientName}</h2>
            <p className="text-[10px] text-[#4A6A8A] mt-0.5 flex items-center gap-1">
              <Phone size={11} /> {booking.phone}
            </p>
          </div>
          <Badge status={booking.status}>{booking.status}</Badge>
        </div>

        <div className="mt-3 bg-[#E8F4FF] rounded-lg p-3">
          <p className="text-[10px] text-[#4A6A8A] mb-1">Test / Package</p>
          <div className="flex justify-between items-center gap-3">
            <h3 className="text-xs font-medium text-[#0A2240]">
              {booking?.test?.title || booking?.package?.title || 'N/A'}
            </h3>
            <p className="font-mono font-bold text-[#1A6FD4] text-sm whitespace-nowrap">
              ₹{booking?.test?.price || booking?.package?.price || 0}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-[#EEF6FF] rounded-lg p-3">
            <p className="text-[10px] text-[#4A6A8A]">Date</p>
            <h3 className="text-xs font-medium text-[#0A2240] mt-0.5">{booking.bookingDate}</h3>
          </div>
          <div className="bg-[#EEF6FF] rounded-lg p-3">
            <p className="text-[10px] text-[#4A6A8A]">Time</p>
            <h3 className="text-xs font-medium text-[#0A2240] mt-0.5">{booking.bookingTime}</h3>
          </div>
        </div>

        <div className="mt-2 bg-[#EEF6FF] rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-[#4A6A8A]">Payment Status</span>
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

        <div className="mt-2 bg-[#E8F4FF] rounded-lg p-3">
          <p className="text-[10px] text-[#4A6A8A]">Service Address</p>
          <p className="text-[11px] text-[#0A2240] mt-1">
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
            className="mt-3 w-full flex justify-center bg-[#1A6FD4] hover:bg-[#155db8] text-white py-2 rounded-lg font-medium text-xs transition"
          >
            <FileText className="inline mr-1.5" size={13} />
            Download Report
          </a>
        )}

        {booking.status !== BOOKING_STATUS.COMPLETED &&
          booking.status !== BOOKING_STATUS.CANCELLED && (
            <Button onClick={() => openManageModal(booking)} fullWidth variant="warning" className="mt-2">
              <Settings className="inline mr-1.5" size={13} />
              Manage Booking
            </Button>
          )}
      </div>
    </div>
  )
}

export default BookingMobileCard
