import React from 'react'

const BookingStatusBadge = ({
  status
}) => {

  return (

    <span
      className={`px-4 py-2 rounded-full text-xs font-semibold

        ${
          status === 'Completed'

            ? 'bg-green-100 text-green-700'

            : status === 'Assigned'

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