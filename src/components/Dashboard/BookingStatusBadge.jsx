import React from 'react'
import { BOOKING_STATUS } from '@/constants/status'
const BookingStatusBadge = ({ status }) => {
  return (
    <span
      className={`px-4 py-2 rounded-full text-xs font-semibold
        ${
          status === BOOKING_STATUS.COMPLETED
            ? 'bg-green-100 text-green-700'
            : status === BOOKING_STATUS.ASSIGNED
              ? 'bg-blue-100 text-blue-700'
              : 'bg-yellow-100 text-yellow-700'
        }
      `}
    >
      {status}
    </span>
  )
}
export default BookingStatusBadge
