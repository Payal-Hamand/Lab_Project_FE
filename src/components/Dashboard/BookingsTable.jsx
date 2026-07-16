import React from 'react'
import { FaDownload } from 'react-icons/fa'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
const BookingsTable = ({
  bookings,
  showPatient = true,
  showPayment = true,
  showReport = true,
  showAssistant = false,
  openManageModal,
  isAdmin = false,
  openEditModal,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px]">
        <thead className="bg-blue-50">
          <tr>
            <th className="text-left px-6 py-4">Test</th>
            {showPatient && <th className="text-left px-6 py-4">Patient</th>}
            <th className="text-left px-6 py-4">Date</th>
            <th className="text-left px-6 py-4">Time</th>
            <th className="text-left px-6 py-4">Status</th>
            {isAdmin && <th className="py-5 px-4 font-semibold">Assigned Lab</th>}
            {showPayment && <th className="text-left px-6 py-4">Payment</th>}
            {showAssistant && <th className="text-left px-6 py-4">Assistant</th>}
            {showReport && <th className="text-left px-6 py-4">Report</th>}
            <th className="text-left px-6 py-4">{isAdmin ? 'Edit' : 'Actions'}</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((item) => (
            <tr key={item._id} className="border-b">
              {/* Test */}
              <td className="px-6 py-5 font-semibold text-blue-950 truncate">
                {item?.test?.title || item?.package?.title}
              </td>
              {/* Patient */}
              {showPatient && (
                <td className="px-6 py-5">
                  <div>
                    <h3 className="font-semibold truncate text-gray-800">{item.patientName}</h3>
                    <p className="text-sm text-gray-500">{item.phone}</p>
                  </div>
                </td>
              )}
              {/* Date */}
              <td className="px-6 py-5 truncate">{item.bookingDate}</td>
              {/* Time */}
              <td className="px-6 py-5 truncate">{item.bookingTime}</td>
              {/* Status */}
              <td className="px-6 py-5 truncate">
                <Badge status={item.status}>{item.status}</Badge>
              </td>
              {/* Assign Lab */}
              {isAdmin && (
                <td className="py-5 px-4">
                  <div>
                    <h3 className="font-semibold text-blue-950">
                      {item.labOwner?.name || 'Not Assigned'}
                    </h3>
                    <div className="group relative w-[220px]">
                      <p className="text-sm text-gray-600 mt-2 truncate cursor-pointer">
                        📍 {item.labOwner?.labAddress || 'No Address'}
                      </p>
                      <div className="absolute hidden group-hover:block z-50 bg-gray-900 text-white text-xs rounded-xl p-3 w-72 left-0 top-8 shadow-lg">
                        {item.labOwner?.labAddress}
                      </div>
                    </div>
                  </div>
                </td>
              )}
              {/* Payment */}
              {showPayment && (
                <td className="px-6 py-5">
                  <Badge status={item.paymentStatus}>{item.paymentStatus}</Badge>
                </td>
              )}
              {/* Assistant */}
              {showAssistant && (
                <td className="px-6 py-5">
                  {item.assignedLabAssistant ? (
                    <div>
                      <p className="font-semibold">{item.assignedLabAssistant.name}</p>
                      <p className="text-sm text-gray-500">{item.assignedLabAssistant.email}</p>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">Not Assigned</span>
                  )}
                </td>
              )}
              {/* Report */}
              {showReport && (
                <td className="px-6 py-5">
                  {item.report ? (
                    <a href={item.report} target="_blank" rel="noreferrer">
                      <Button
                        variant="success"
                        size="sm"
                        className="inline-flex items-center gap-2"
                      >
                        <FaDownload />
                        Download
                      </Button>
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">Not Available</span>
                  )}
                </td>
              )}
              <td className="px-6 py-5">
                {isAdmin ? (
                  <Button
                    onClick={() => openEditModal && openEditModal(item)}
                    disabled={item.status === BOOKING_STATUS.COMPLETED}
                    className={`truncate
    ${
      item.status === BOOKING_STATUS.COMPLETED || item.status === BOOKING_STATUS.CANCELLED
        ? 'bg-gray-400 cursor-not-allowed'
        : ''
    }
  `}
                  >
                    ✏️ Edit Lab
                  </Button>
                ) : (
                  <>
                    {item.status !== BOOKING_STATUS.COMPLETED &&
                      item.status !== BOOKING_STATUS.CANCELLED && (
                        <Button onClick={() => openManageModal && openManageModal(item)}>
                          ⚙️ Manage
                        </Button>
                      )}
                    {item.status === BOOKING_STATUS.CANCELLED && (
                      <span className="bg-red-100 text-red-700 px-3 py-2 rounded-xl text-xs font-semibold">
                        Cancelled
                      </span>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default BookingsTable
