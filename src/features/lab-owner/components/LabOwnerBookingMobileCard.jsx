import React from 'react'
import { Phone, Download, FileText, CircleCheckBig } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { PAYMENT_STATUS } from '@/constants/status'

const LabOwnerBookingMobileCard = ({
  filteredBookings,
  assistants,
  handleAssignAssistant,
  selectedReport,
  setSelectedReport,
  uploadingReport,
  handleUploadReport,
}) => {
  return (
    <div className="lg:hidden grid gap-4">
      {filteredBookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white rounded-[28px] shadow-lg border border-slate-100"
        >
          <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600" />
          <div className="p-5">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h2 className="font-bold text-xl text-slate-900">{booking.patientName}</h2>
                <p className="text-gray-500 mt-1 flex items-center gap-1">
                  <Phone size={14} /> {booking.phone}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Badge status={booking.paymentStatus}>{booking.paymentStatus}</Badge>
                <Badge status={booking.status}>{booking.status}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500">Test / Package</p>
                <h3 className="font-bold text-slate-800 mt-1">
                  {booking?.test?.title || booking?.package?.title}
                </h3>
              </div>
              <div className="bg-green-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500">Amount</p>
                <h3 className="font-bold text-green-700 mt-1">
                  ₹{booking?.test?.price || booking?.package?.price}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-purple-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500">Booking Date</p>
                <h3 className="font-semibold text-purple-700 mt-1">{booking.bookingDate}</h3>
              </div>
              <div className="bg-orange-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500">Booking Time</p>
                <h3 className="font-semibold text-orange-700 mt-1">{booking.bookingTime}</h3>
              </div>
            </div>
            <div className="mt-4 bg-slate-50 rounded-2xl p-4">
              <p className="text-xs text-gray-500">Patient Address</p>
              <p className="mt-2 text-slate-700">
                {booking.flatNo}, {booking.address}, {booking.city}
                {' - '}
                {booking.pincode}
              </p>
            </div>
            <div className="mt-4 bg-purple-50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-500">Assigned Assistant</p>
                {booking.assignedLabAssistant && <Badge variant="success">Assigned</Badge>}
              </div>
              {booking.assignedLabAssistant ? (
                <div className="bg-white rounded-xl p-3 border border-purple-100">
                  <h3 className="font-semibold text-slate-800">
                    {booking.assignedLabAssistant.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{booking.assignedLabAssistant.email}</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-red-500 mb-3">No Assistant Assigned</p>
                  <Select onChange={(e) => handleAssignAssistant(booking._id, e.target.value)}>
                    <option value="">Select Assistant</option>
                    {assistants.map((assistant) => (
                      <option key={assistant._id} value={assistant._id}>
                        {assistant.name}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
            </div>
            <div className="mt-4 bg-pink-50 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-medium text-gray-500">Sample Images</p>
                <Badge variant="info">{booking.sampleImages?.length || 0} Images</Badge>
              </div>
              {booking.sampleImages?.length > 0 ? (
                <div className="grid grid-cols-5 gap-3">
                  {booking.sampleImages.map((image, index) => (
                    <a key={index} href={image} target="_blank" rel="noreferrer">
                      <img
                        src={image}
                        alt={`Sample ${index + 1}`}
                        className="
          w-full
          h-20
          object-cover
          rounded-xl
          border
          hover:scale-105
          transition
          "
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-gray-500">No sample images uploaded yet</p>
                </div>
              )}
            </div>
            {booking.report ? (
              <div className="bg-white rounded-xl p-4 border border-green-100">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-green-700 flex items-center gap-2">
                    <CircleCheckBig size={18} /> Report Uploaded
                  </p>
                  <Badge variant="success">Ready</Badge>
                </div>
                <Button variant="success" fullWidth className="mt-4">
                  <a
                    href={booking.report}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white flex items-center justify-center gap-2"
                  >
                    <Download />
                    View Report
                  </a>
                </Button>
              </div>
            ) : booking.paymentStatus === PAYMENT_STATUS.PAID ? (
              <div className="space-y-3">
                <label
                  className="
  flex items-center justify-center
  gap-2 border-2 border-dashed
  border-blue-300 rounded-2xl
  py-4 cursor-pointer
  hover:bg-blue-50
  "
                >
                  <FileText size={18} className="inline mr-2" />
                  Select Report
                  <Input
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={(e) =>
                      setSelectedReport({
                        ...selectedReport,
                        [booking._id]: e.target.files[0],
                      })
                    }
                    containerClassName="hidden"
                  />
                </label>
                {selectedReport[booking._id] && (
                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="text-sm text-blue-700 font-medium break-all">
                      Selected: {selectedReport[booking._id].name}
                    </p>
                  </div>
                )}
                <Button
                  onClick={() => handleUploadReport(booking._id)}
                  loading={uploadingReport[booking._id]}
                  fullWidth
                >
                  Upload Report
                </Button>
              </div>
            ) : (
              <div className="bg-yellow-50 rounded-xl p-4 text-center">
                <p className="text-yellow-700 font-medium">Payment Pending</p>
                <p className="text-gray-500 text-sm mt-1">
                  Report can be uploaded only after payment.
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default LabOwnerBookingMobileCard
