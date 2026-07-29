import React, { useState } from 'react'
import { CircleUser, MapPinCheck, Microscope, Banknote, MapPin, Route, Download, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'

const LabAssistantBookingsTable = ({
  filteredBookings,
  handleReached,
  openSampleModal,
  openNavigation,
  handlePayment,
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
      className="text-left px-5 py-4 text-xs font-semibold text-muted-foreground cursor-pointer hover:bg-gray-100/50 transition-colors select-none group"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center gap-1.5">
        {label}
        <span className="text-gray-400 group-hover:text-primary transition-colors">
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
    <div className="w-full bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1300px] border-collapse">
          <thead className="bg-primary/10 border-b border-border">
            <tr>
              <SortHeader label="Patient" sortKey="patientName" />
              <SortHeader label="Test" sortKey="testTitle" />
              <SortHeader label="Date" sortKey="bookingDate" />
              <th className="text-left px-5 py-4 text-xs font-semibold text-muted-foreground">Address</th>
              <SortHeader label="Status" sortKey="status" />
              <SortHeader label="Payment" sortKey="paymentStatus" />
              <th className="text-center px-5 py-4 text-xs font-semibold text-muted-foreground">Actions</th>
              <th className="text-center px-5 py-4 text-xs font-semibold text-muted-foreground">Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedBookings.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CircleUser className="text-primary" size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{item.patientName}</h3>
                      <p className="text-[11px] text-muted-foreground">{item.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item?.test?.title || item?.package?.title}
                    </p>
                    <p className="font-mono text-xs font-bold text-primary mt-0.5">
                      ₹{item?.test?.price || item?.package?.price}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-foreground">{item.bookingDate}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.bookingTime}</p>
                </td>
                <td className="px-5 py-4 max-w-[200px]">
                  <div className="flex gap-1.5 items-start">
                    <MapPin className="text-red-500 mt-0.5 flex-shrink-0" size={14} />
                    <span className="text-[12px] text-muted-foreground line-clamp-2">{item.address}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <Badge status={item.status}>{item.status}</Badge>
                </td>
                <td className="px-5 py-4">
                  <Badge status={item.paymentStatus}>{item.paymentStatus}</Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-1.5 flex-wrap justify-center items-center">
                    <Button 
                      variant="danger" 
                      onClick={() => openNavigation(item)}
                      icon={<Route size={14} />}
                      expandableLabel="Nav"
                    />
                    <Button
                      variant={item.status === BOOKING_STATUS.ASSIGNED ? 'primary' : 'ghost'}
                      onClick={() => handleReached(item._id)}
                      disabled={item.status !== BOOKING_STATUS.ASSIGNED}
                      icon={<MapPinCheck size={14} />}
                      expandableLabel="Reach"
                    />
                    <Button
                      variant={item.status === BOOKING_STATUS.REACHED ? 'secondary' : 'ghost'}
                      onClick={() => openSampleModal(item)}
                      disabled={item.status !== BOOKING_STATUS.REACHED}
                      icon={<Microscope size={14} />}
                      expandableLabel="Sample"
                    />
                    <Button
                      variant={
                        item.status === BOOKING_STATUS.SAMPLE_COLLECTED &&
                        item.paymentStatus !== PAYMENT_STATUS.PAID
                          ? 'success'
                          : 'ghost'
                      }
                      onClick={() => handlePayment(item)}
                      disabled={
                        item.status !== BOOKING_STATUS.SAMPLE_COLLECTED ||
                        item.paymentStatus === PAYMENT_STATUS.PAID
                      }
                      icon={<Banknote size={14} />}
                      expandableLabel="Pay"
                    />
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  {item.report ? (
                    <a href={item.report} target="_blank" rel="noreferrer">
                      <Button variant="success" icon={<Download size={14}/>} expandableLabel="Report" />
                    </a>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-md text-[11px] font-semibold">Pending</span>
                  )}
                </td>
              </tr>
            ))}
            {sortedBookings.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-gray-500">
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

export default LabAssistantBookingsTable
