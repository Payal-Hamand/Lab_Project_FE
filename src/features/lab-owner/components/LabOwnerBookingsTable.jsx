import React, { useState } from 'react'
import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { PAYMENT_STATUS } from '@/constants/status'
import { ArrowUpDown, ChevronUp, ChevronDown, Download, UploadCloud } from 'lucide-react'

const LabOwnerBookingsTable = ({
  filteredBookings,
  assistants,
  handleAssignAssistant,
  selectedReport,
  setSelectedReport,
  uploadingReport,
  handleUploadReport,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'bookingDate', direction: 'desc' })

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedBookings = React.useMemo(() => {
    const sortableItems = [...filteredBookings]
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]

        if (sortConfig.key === 'testTitle') {
          aValue = a.test?.title || a.package?.title || ''
          bValue = b.test?.title || b.package?.title || ''
        }
        if (sortConfig.key === 'amount') {
          aValue = a.test?.price || a.package?.price || 0
          bValue = b.test?.price || b.package?.price || 0
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [filteredBookings, sortConfig])

  const SortHeader = ({ label, sortKey }) => (
    <th 
      className="text-left px-5 py-4 text-xs font-semibold text-[#4A6A8A] cursor-pointer hover:bg-gray-100/50 transition-colors select-none group"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center gap-1.5">
        {label}
        <span className="text-gray-400 group-hover:text-[#1A6FD4] transition-colors">
          {sortConfig.key === sortKey ? (
            sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
          ) : (
            <ArrowUpDown size={14} />
          )}
        </span>
      </div>
    </th>
  )

  return (
    <div className="w-full bg-white rounded-xl border border-[#C5DBF0] shadow-sm overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] border-collapse">
          <thead className="bg-[#EEF6FF]/60 border-b border-[#C5DBF0]">
            <tr>
              <SortHeader label="Patient" sortKey="patientName" />
              <SortHeader label="Test / Package" sortKey="testTitle" />
              <SortHeader label="Amount" sortKey="amount" />
              <SortHeader label="Date" sortKey="bookingDate" />
              <th className="text-left px-5 py-4 text-xs font-semibold text-[#4A6A8A]">Assistant</th>
              <SortHeader label="Status" sortKey="status" />
              <SortHeader label="Payment" sortKey="paymentStatus" />
              <th className="text-left px-5 py-4 text-xs font-semibold text-[#4A6A8A]">Samples</th>
              <th className="text-left px-5 py-4 text-xs font-semibold text-[#4A6A8A]">Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedBookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-5 py-4">
                  <div className="font-medium text-[#0A2240] text-sm">{booking.patientName}</div>
                  <div className="text-[11px] text-[#4A6A8A] mt-0.5">{booking.phone}</div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-medium text-[#0A2240] text-sm">
                    {booking?.test?.title || booking?.package?.title}
                  </div>
                  <div className="text-[11px] text-[#4A6A8A] mt-0.5">{booking.city}</div>
                </td>
                <td className="px-5 py-4">
                  <span className="font-mono font-bold text-sm text-[#1A6FD4]">
                    ₹{booking?.test?.price || booking?.package?.price}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="text-sm text-[#0A2240]">{booking.bookingDate}</div>
                  <div className="text-[11px] text-[#4A6A8A] mt-0.5">{booking.bookingTime}</div>
                </td>
                <td className="px-5 py-4">
                  {booking.assignedLabAssistant ? (
                    <div>
                      <p className="text-sm font-medium text-[#0A2240]">
                        {booking.assignedLabAssistant.name}
                      </p>
                      <p className="text-[11px] text-[#4A6A8A] mt-0.5">
                        {booking.assignedLabAssistant.email}
                      </p>
                    </div>
                  ) : (
                    <Select
                      onChange={(e) => handleAssignAssistant(booking._id, e.target.value)}
                      className="text-xs py-1.5 h-8 min-w-[140px]"
                    >
                      <option value="">Assign</option>
                      {assistants.map((assistant) => (
                        <option key={assistant._id} value={assistant._id}>
                          {assistant.name}
                        </option>
                      ))}
                    </Select>
                  )}
                </td>
                <td className="px-5 py-4">
                  <Badge status={booking.status}>{booking.status}</Badge>
                </td>
                <td className="px-5 py-4">
                  <Badge status={booking.paymentStatus}>{booking.paymentStatus}</Badge>
                </td>
                <td className="px-5 py-4">
                  {booking.sampleImages?.length > 0 ? (
                    <div className="flex items-center gap-1.5 flex-wrap max-w-[160px]">
                      {booking.sampleImages.slice(0, 3).map((image, index) => (
                        <a key={index} href={image} target="_blank" rel="noreferrer" className="shrink-0 hover:scale-110 transition-transform">
                          <img
                            src={image}
                            alt={`Sample ${index + 1}`}
                            className="w-10 h-10 rounded-md object-cover border border-[#C5DBF0]"
                          />
                        </a>
                      ))}
                      {booking.sampleImages.length > 3 && (
                        <span className="w-10 h-10 bg-[#EEF6FF] border border-[#C5DBF0] rounded-md flex items-center justify-center text-[10px] font-medium text-[#1A6FD4]">
                          +{booking.sampleImages.length - 3}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-[11px] text-gray-400">No Samples</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  {booking.report ? (
                    <a href={booking.report} target="_blank" rel="noreferrer">
                      <Button variant="success" icon={<Download size={14}/>} expandableLabel="View Report" />
                    </a>
                  ) : booking.paymentStatus === PAYMENT_STATUS.PAID ? (
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <Input
                        type="file"
                        accept=".pdf"
                        className="text-[10px] py-1 h-7 file:py-0 file:px-2 file:text-[10px] file:bg-gray-100 file:border-0 file:rounded-sm file:mr-2"
                        onChange={(e) =>
                          setSelectedReport({
                            ...selectedReport,
                            [booking._id]: e.target.files[0],
                          })
                        }
                      />
                      <Button
                        onClick={() => handleUploadReport(booking._id)}
                        loading={uploadingReport[booking._id]}
                        icon={<UploadCloud size={14}/>}
                        expandableLabel="Upload"
                      />
                    </div>
                  ) : (
                    <span className="text-red-500 text-[11px] font-medium bg-red-50 px-2 py-1 rounded">Pending</span>
                  )}
                </td>
              </tr>
            ))}
            
            {sortedBookings.length === 0 && (
              <tr>
                <td colSpan={9} className="px-5 py-10 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LabOwnerBookingsTable
