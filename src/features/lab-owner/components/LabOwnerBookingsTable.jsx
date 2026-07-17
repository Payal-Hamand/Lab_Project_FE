import React from 'react'
import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { PAYMENT_STATUS } from '@/constants/status'

const LabOwnerBookingsTable = ({
  filteredBookings,
  assistants,
  handleAssignAssistant,
  selectedReport,
  setSelectedReport,
  uploadingReport,
  handleUploadReport,
}) => {
  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b">
            <th className="px-4 py-4 text-left ">Patient</th>
            <th className="px-4 py-4 text-left truncate">Test / Package</th>
            <th className="px-4 py-4 text-left">Amount</th>
            <th className="px-4 py-4 text-left truncate">Date</th>
            <th className="px-4 py-4 text-left truncate">Assistant</th>
            <th className="px-4 py-4 text-left truncate">Status</th>
            <th className="px-4 py-4 text-left truncate">Payment</th>
            <th className="px-4 py-4 text-left">Samples</th>
            <th className="px-4 py-4 text-left ">Report</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr
              key={booking._id}
              className="
      border-b
      hover:bg-slate-50
      transition
      "
            >
              <td className="px-4 py-4 truncate">
                <div>
                  <h4 className="font-semibold">{booking.patientName}</h4>
                  <p className="text-sm text-gray-500">{booking.phone}</p>
                </div>
              </td>
              <td className="px-4 py-4 truncate">
                <div>
                  <p className="font-medium">{booking?.test?.title || booking?.package?.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{booking.city}</p>
                </div>
              </td>
              <td className="px-4 py-4 font-semibold text-green-600">
                ₹{booking?.test?.price || booking?.package?.price}
              </td>
              <td className="px-4 py-4 truncate">
                <div>{booking.bookingDate}</div>
                <div className="text-sm text-gray-500">{booking.bookingTime}</div>
              </td>
              <td className="px-4 py-4">
                {booking.assignedLabAssistant ? (
                  <div>
                    <p className="font-medium">{booking.assignedLabAssistant.name}</p>
                    <p className="text-xs text-gray-500">{booking.assignedLabAssistant.email}</p>
                  </div>
                ) : (
                  <Select
                    onChange={(e) => handleAssignAssistant(booking._id, e.target.value)}
                    containerClassName="max-w-[180px]"
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
              <td className="px-4 py-4 truncate">
                <Badge status={booking.status}>{booking.status}</Badge>
              </td>
              <td className="px-4 py-4">
                <Badge status={booking.paymentStatus}>{booking.paymentStatus}</Badge>
              </td>
              <td className="px-4 py-4">
                {booking.sampleImages?.length > 0 ? (
                  <div className="flex items-center gap-2">
                    {booking.sampleImages.slice(0, 3).map((image, index) => (
                      <a
                        key={index}
                        href={image}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative"
                      >
                        <img
                          src={image}
                          alt={`Sample ${index + 1}`}
                          className="
          w-14 h-14
          rounded-xl
          object-cover
          border-2 border-white
          shadow
          hover:scale-110
          transition
          "
                        />
                        <span
                          className="
          absolute -bottom-7 left-1/2
          -translate-x-1/2
          bg-black text-white
          text-xs px-2 py-1
          rounded opacity-0
          group-hover:opacity-100
          transition whitespace-nowrap
          "
                        >
                          View Image
                        </span>
                      </a>
                    ))}
                    {booking.sampleImages.length > 3 && (
                      <Button
                        size="icon-sm"
                        variant="primary"
                        className="w-14 h-14 text-sm"
                        title={`${booking.sampleImages.length - 3} more images`}
                      >
                        +{booking.sampleImages.length - 3}
                      </Button>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">No Samples</span>
                )}
              </td>
              <td className="px-4 py-4">
                {booking.report ? (
                  <Button variant="success" size="sm">
                    <a
                      href={booking.report}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white"
                    >
                      View Report
                    </a>
                  </Button>
                ) : booking.paymentStatus === PAYMENT_STATUS.PAID ? (
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept=".pdf"
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
                      size="sm"
                    >
                      Upload
                    </Button>
                  </div>
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

export default LabOwnerBookingsTable
