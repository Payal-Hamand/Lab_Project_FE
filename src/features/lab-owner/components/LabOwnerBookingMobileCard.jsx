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
    <div className="lg:hidden grid gap-3">
      {filteredBookings.map((booking) => (
        <div key={booking._id} className="bg-white border border-[#C5DBF0] rounded-[10px] overflow-hidden">
          <div
            className={`h-1.5 ${
              booking.status === 'completed'
                ? 'bg-green-600'
                : booking.status === 'sample_collected'
                ? 'bg-[#378ADD]'
                : 'bg-[#1A6FD4]'
            }`}
          />
          <div className="p-4">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h2 className="text-xs font-medium text-[#0A2240]">{booking.patientName}</h2>
                <p className="text-[10px] text-[#4A6A8A] mt-0.5 flex items-center gap-1">
                  <Phone size={11} /> {booking.phone}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 items-end">
                <Badge status={booking.paymentStatus}>{booking.paymentStatus}</Badge>
                <Badge status={booking.status}>{booking.status}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-[#E8F4FF] rounded-lg p-2.5">
                <p className="text-[10px] text-[#4A6A8A]">Test / Package</p>
                <h3 className="text-xs font-medium text-[#0A2240] mt-0.5">
                  {booking?.test?.title || booking?.package?.title}
                </h3>
              </div>
              <div className="bg-[#EEF6FF] rounded-lg p-2.5">
                <p className="text-[10px] text-[#4A6A8A]">Amount</p>
                <h3 className="font-mono font-bold text-[#1A6FD4] text-sm mt-0.5">
                  ₹{booking?.test?.price || booking?.package?.price}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-[#EEF6FF] rounded-lg p-2.5">
                <p className="text-[10px] text-[#4A6A8A]">Date</p>
                <h3 className="text-xs font-medium text-[#0A2240] mt-0.5">{booking.bookingDate}</h3>
              </div>
              <div className="bg-[#EEF6FF] rounded-lg p-2.5">
                <p className="text-[10px] text-[#4A6A8A]">Time</p>
                <h3 className="text-xs font-medium text-[#0A2240] mt-0.5">{booking.bookingTime}</h3>
              </div>
            </div>

            <div className="mt-2 bg-[#E8F4FF] rounded-lg p-3">
              <p className="text-[10px] text-[#4A6A8A]">Patient Address</p>
              <p className="text-[11px] text-[#0A2240] mt-1">
                {booking.flatNo}, {booking.address}, {booking.city}
                {' - '}
                {booking.pincode}
              </p>
            </div>

            <div className="mt-2 bg-[#EEF6FF] rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-medium text-[#4A6A8A]">Assigned Assistant</p>
                {booking.assignedLabAssistant && <Badge variant="success">Assigned</Badge>}
              </div>
              {booking.assignedLabAssistant ? (
                <div className="bg-white rounded-lg p-2.5 border border-[#C5DBF0]">
                  <h3 className="text-xs font-medium text-[#0A2240]">
                    {booking.assignedLabAssistant.name}
                  </h3>
                  <p className="text-[10px] text-[#4A6A8A] mt-0.5">
                    {booking.assignedLabAssistant.email}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-[10px] text-red-500 mb-2">No Assistant Assigned</p>
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

            {booking.sampleImages?.length > 0 && (
              <div className="mt-2 bg-[#E8F4FF] rounded-lg p-3">
                <p className="text-[10px] font-medium text-[#4A6A8A] mb-2">
                  Sample Images ({booking.sampleImages.length})
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {booking.sampleImages.map((image, index) => (
                    <a key={index} href={image} target="_blank" rel="noreferrer">
                      <img
                        src={image}
                        alt={`Sample ${index + 1}`}
                        className="w-full h-14 object-cover rounded-lg border border-[#C5DBF0] hover:scale-105 transition"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {booking.report ? (
              <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-green-700 flex items-center gap-1.5">
                    <CircleCheckBig size={13} /> Report Uploaded
                  </p>
                  <Badge variant="success">Ready</Badge>
                </div>
                <a
                  href={booking.report}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 w-full flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-xs font-medium transition"
                >
                  <Download size={12} />
                  View Report
                </a>
              </div>
            ) : booking.paymentStatus === PAYMENT_STATUS.PAID ? (
              <div className="mt-3 space-y-2">
                <label className="flex items-center justify-center gap-2 border border-dashed border-[#C5DBF0] rounded-lg py-3 cursor-pointer hover:bg-[#EEF6FF] text-[#4A6A8A] text-xs transition">
                  <FileText size={13} />
                  Select Report PDF
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
                  <div className="bg-[#EEF6FF] rounded-lg p-2.5">
                    <p className="text-[10px] text-[#1A6FD4] font-medium break-all">
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
              <div className="mt-3 bg-[#FFF7ED] rounded-lg p-3 text-center">
                <p className="text-orange-700 text-xs font-medium">Payment Pending</p>
                <p className="text-[#4A6A8A] text-[10px] mt-0.5">
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
