import React from 'react'
import { CircleUser, MapPinCheck, Microscope, Banknote, MapPin, Route } from 'lucide-react'
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
  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full min-w-[1400px]">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-4 py-4 text-left">Patient</th>
            <th className="px-4 py-4 text-left">Test</th>
            <th className="px-4 py-4 text-left">Date</th>
            <th className="px-4 py-4 text-left">Address</th>
            <th className="px-4 py-4 text-left">Status</th>
            <th className="px-4 py-4 text-left">Payment</th>
            <th className="px-4 py-4 text-center w-[240px]">Actions</th>
            <th className="px-4 py-4 text-center">Report</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((item) => (
            <tr key={item._id} className="border-b hover:bg-slate-50">
              <td className="px-4 py-5 truncate">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <CircleUser className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.patientName}</h3>
                    <p className="text-sm text-gray-500">{item.phone}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-5 truncate">
                <div>
                  <p className="font-semibold">{item?.test?.title || item?.package?.title}</p>
                  <p className="text-green-600 font-bold">
                    ₹{item?.test?.price || item?.package?.price}
                  </p>
                </div>
              </td>
              <td className="px-4 py-5 truncate">
                <p className="font-medium">{item.bookingDate}</p>
                <p className="text-sm text-gray-500">{item.bookingTime}</p>
              </td>
              <td className="px-4 py-5 max-w-xs truncate">
                <div className="flex gap-2">
                  <MapPin className="text-red-500 mt-1" />
                  <span className="text-sm text-gray-600">{item.address}</span>
                </div>
              </td>
              <td className="px-4 py-5 truncate">
                <Badge status={item.status}>{item.status}</Badge>
              </td>
              <td className="px-4 py-5 truncate">
                <Badge status={item.paymentStatus}>{item.paymentStatus}</Badge>
              </td>
              <td className="px-4 py-5">
                <div className="flex gap-2 flex-wrap">
                  <div className="relative group">
                    <Button size="icon" variant="danger" onClick={() => openNavigation(item)}>
                      <Route />
                    </Button>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap z-50">
                      Navigation
                    </span>
                  </div>
                  <div className="relative group">
                    <Button
                      size="icon"
                      variant={item.status === BOOKING_STATUS.ASSIGNED ? 'primary' : 'ghost'}
                      onClick={() => handleReached(item._id)}
                      disabled={item.status !== BOOKING_STATUS.ASSIGNED}
                    >
                      <MapPinCheck />
                    </Button>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap z-50">
                      Mark Reached
                    </span>
                  </div>
                  <div className="relative group">
                    <Button
                      size="icon"
                      variant={item.status === BOOKING_STATUS.REACHED ? 'secondary' : 'ghost'}
                      onClick={() => openSampleModal(item)}
                      disabled={item.status !== BOOKING_STATUS.REACHED}
                    >
                      <Microscope />
                    </Button>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap z-50">
                      Collect Sample
                    </span>
                  </div>
                  <div className="relative group">
                    <Button
                      size="icon"
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
                    >
                      <Banknote />
                    </Button>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap z-50">
                      Collect Payment
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-5 truncate">
                {item.report ? (
                  <a
                    href={item.report}
                    target="_blank"
                    rel="noreferrer"
                    className="
      bg-green-600
      text-white
      px-4
      py-2
      rounded-xl
      "
                  >
                    View Report
                  </a>
                ) : (
                  <span className="text-red-500">Payment Pending</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LabAssistantBookingsTable
