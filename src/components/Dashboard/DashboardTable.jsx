import React from 'react'
import BookingStatusBadge from './BookingStatusBadge'
import Select from '@/components/ui/Select'

const DashboardTable = ({ bookings, assistants, handleAssignAssistant }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-275">
        <thead className="bg-primary/10">
          <tr>
            <th className="px-6 py-3.5 text-left text-[11px] font-medium text-muted-foreground">
              Patient
            </th>
            <th className="px-6 py-3.5 text-left text-[11px] font-medium text-muted-foreground">Test</th>
            <th className="px-6 py-3.5 text-left text-[11px] font-medium text-muted-foreground">
              Pincode
            </th>
            <th className="px-6 py-3.5 text-left text-[11px] font-medium text-muted-foreground">
              Status
            </th>
            <th className="px-6 py-3.5 text-left text-[11px] font-medium text-muted-foreground">
              Assigned Assistant
            </th>
            <th className="px-6 py-3.5 text-left text-[11px] font-medium text-muted-foreground">
              Assign Assistant
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-t border-border hover:bg-primary/10 transition">
              <td className="px-6 py-4 text-xs text-foreground">{booking.patientName}</td>
              <td className="px-6 py-4 text-xs text-muted-foreground">{booking.test?.name}</td>
              <td className="px-6 py-4 text-xs text-muted-foreground">{booking.pincode}</td>
              <td className="px-6 py-4">
                <BookingStatusBadge status={booking.status} />
              </td>
              <td className="px-6 py-4">
                {booking.assignedLabAssistant ? (
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      {booking.assignedLabAssistant.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {booking.assignedLabAssistant.email}
                    </p>
                  </div>
                ) : (
                  <span className="text-[10px] text-muted-foreground">Not Assigned</span>
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
