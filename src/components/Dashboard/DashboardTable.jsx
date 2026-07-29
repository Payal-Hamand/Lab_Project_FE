import React from 'react'
import BookingStatusBadge from './BookingStatusBadge'
import Select from '@/components/ui/Select'

const DashboardTable = ({ bookings, assistants, handleAssignAssistant }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-275">
        <thead className="bg-[#E8F4FF]">
          <tr>
            <th className="px-6 py-3.5 text-left text-[11px] font-medium text-[#4A6A8A]">
              Patient
            </th>
            <th className="px-6 py-3.5 text-left text-[11px] font-medium text-[#4A6A8A]">Test</th>
            <th className="px-6 py-3.5 text-left text-[11px] font-medium text-[#4A6A8A]">
              Pincode
            </th>
            <th className="px-6 py-3.5 text-left text-[11px] font-medium text-[#4A6A8A]">
              Status
            </th>
            <th className="px-6 py-3.5 text-left text-[11px] font-medium text-[#4A6A8A]">
              Assigned Assistant
            </th>
            <th className="px-6 py-3.5 text-left text-[11px] font-medium text-[#4A6A8A]">
              Assign Assistant
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-t border-[#E8F4FF] hover:bg-[#EEF6FF] transition">
              <td className="px-6 py-4 text-xs text-[#0A2240]">{booking.patientName}</td>
              <td className="px-6 py-4 text-xs text-[#4A6A8A]">{booking.test?.name}</td>
              <td className="px-6 py-4 text-xs text-[#4A6A8A]">{booking.pincode}</td>
              <td className="px-6 py-4">
                <BookingStatusBadge status={booking.status} />
              </td>
              <td className="px-6 py-4">
                {booking.assignedLabAssistant ? (
                  <div>
                    <p className="text-xs font-medium text-[#0A2240]">
                      {booking.assignedLabAssistant.name}
                    </p>
                    <p className="text-[10px] text-[#4A6A8A]">
                      {booking.assignedLabAssistant.email}
                    </p>
                  </div>
                ) : (
                  <span className="text-[10px] text-[#4A6A8A]">Not Assigned</span>
                )}
              </td>
              <td className="px-6 py-4">
                <Select
                  onChange={(e) => handleAssignAssistant(booking._id, e.target.value)}
                  value={booking.assignedLabAssistant?._id || ''}
                  containerClassName="min-w-[220px]"
                >
                  <option value="">Select Assistant</option>
                  {assistants.map((assistant) => (
                    <option key={assistant._id} value={assistant._id}>
                      {assistant.name}
                    </option>
                  ))}
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardTable
