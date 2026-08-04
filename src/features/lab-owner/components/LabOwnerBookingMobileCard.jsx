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
  setPreviewReport,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {filteredBookings.map((booking) => (
        <div key={booking._id} className="bg-white border border-border rounded-[10px] overflow-hidden">
          <div
            className={`h-1.5 ${
              booking.status === 'completed'
                ? 'bg-green-600'
                : booking.status === 'sample_collected'
                ? 'bg-primary'
                : 'bg-primary'
            }`}
          />
          <div className="p-4">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h2 className="text-xs font-medium text-foreground">{booking.patientName}</h2>
                <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Phone size={11} /> {booking.phone}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground">Status:</span>
                  <Badge status={booking.status}>{booking.status}</Badge>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground">Payment:</span>
                  <Badge status={booking.paymentStatus}>{booking.paymentStatus}</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-accent rounded-lg p-2.5">
                <p className="text-[10px] text-muted-foreground">Test / Package</p>
                <h3 className="text-xs font-medium text-foreground mt-0.5">
                  {booking?.test?.title || booking?.package?.title}
                </h3>
              </div>
              <div className="bg-primary/10 rounded-lg p-2.5">
                <p className="text-[10px] text-muted-foreground">Amount</p>
                <h3 className="font-mono font-bold text-primary text-sm mt-0.5">
                  ₹{booking?.test?.price || booking?.package?.price}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-primary/10 rounded-lg p-2.5">
                <p className="text-[10px] text-muted-foreground">Date</p>
                <h3 className="text-xs font-medium text-foreground mt-0.5">{booking.bookingDate}</h3>
              </div>
              <div className="bg-primary/10 rounded-lg p-2.5">
                <p className="text-[10px] text-muted-foreground">Time</p>
                <h3 className="text-xs font-medium text-foreground mt-0.5">{booking.bookingTime}</h3>
              </div>
            </div>

            <div className="mt-2 bg-accent rounded-lg p-3">
              <p className="text-[10px] text-muted-foreground">Patient Address</p>
              <p className="text-[11px] text-foreground mt-1">
                {booking.flatNo}, {booking.address}, {booking.city}
                {' - '}
                {booking.pincode}
              </p>
            </div>

            <div className="mt-2 bg-primary/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-medium text-muted-foreground">Assigned Assistant</p>
                {booking.assignedLabAssistant && <Badge variant="success">Assigned</Badge>}
              </div>
              {booking.assignedLabAssistant ? (
                <div className="bg-white rounded-lg p-2.5 border border-border">
                  <h3 className="text-xs font-medium text-foreground">
                    {booking.assignedLabAssistant.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
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
              <div className="mt-2 bg-accent rounded-lg p-3">
                <p className="text-[10px] font-medium text-muted-foreground mb-2">
                  Sample Images ({booking.sampleImages.length})
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {booking.sampleImages.map((image, index) => (
                    <a key={index} href={image} target="_blank" rel="noreferrer">
                      <img
                        src={image}
                        alt={`Sample ${index + 1}`}
                        className="w-full h-14 object-cover rounded-lg border border-border hover:scale-105 transition"
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
                <button
                  onClick={() => setPreviewReport(booking.report)}
                  className="mt-2 w-full flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-xs font-medium transition"
                >
                  <Download size={12} />
                  View Report
                </button>
              </div>
            ) : booking.paymentStatus === PAYMENT_STATUS.PAID ? (
              <div className="mt-3 space-y-2">
                <label className="flex items-center justify-center gap-2 border border-dashed border-border rounded-lg py-3 cursor-pointer hover:bg-primary/10 text-muted-foreground text-xs transition">
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
                  <div className="bg-primary/10 rounded-lg p-2.5">
                    <p className="text-[10px] text-primary font-medium break-all">
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
              <div className="mt-3 bg-accent rounded-lg p-3 text-center">
                <p className="text-orange-700 text-xs font-medium">Payment Pending</p>
                <p className="text-muted-foreground text-[10px] mt-0.5">
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
