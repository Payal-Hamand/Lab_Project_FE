import React from 'react'

import BookingStatusBadge from './BookingStatusBadge'

const DashboardTable = ({
  bookings,

  assistants,

  handleAssignAssistant,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-275">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left">Patient</th>

            <th className="px-6 py-4 text-left">Test</th>

            <th className="px-6 py-4 text-left">Pincode</th>

            <th className="px-6 py-4 text-left">Status</th>

            <th className="px-6 py-4 text-left">Assigned Assistant</th>

            <th className="px-6 py-4 text-left">Assign Assistant</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-t">
              <td className="px-6 py-4">{booking.patientName}</td>

              <td className="px-6 py-4">{booking.test?.name}</td>

              <td className="px-6 py-4">{booking.pincode}</td>

              <td className="px-6 py-4">
                <BookingStatusBadge status={booking.status} />
              </td>

              <td className="px-6 py-4">
                {booking.assignedLabAssistant ? (
                  <div>
                    <p className="font-semibold text-gray-800">
                      {booking.assignedLabAssistant.name}
                    </p>

                    <p className="text-sm text-gray-500">{booking.assignedLabAssistant.email}</p>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">Not Assigned</span>
                )}
              </td>

              <td className="px-6 py-4">
                <select
                  onChange={(e) => handleAssignAssistant(booking._id, e.target.value)}

                  value={booking.assignedLabAssistant?._id || ''}

                  className="border rounded-xl px-4 py-2 outline-none min-w-55"
                >
                  <option value="">Select Assistant</option>

                  {assistants.map((assistant) => (
                    <option
                      key={assistant._id}

                      value={assistant._id}
                    >
                      {assistant.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardTable
