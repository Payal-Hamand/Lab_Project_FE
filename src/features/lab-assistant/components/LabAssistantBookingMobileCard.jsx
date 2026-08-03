import React from 'react'
import {
  CircleUser,
  MapPinCheck,
  Microscope,
  Banknote,
  FileText,
  MapPin,
  Route,
  Phone,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'

const LabAssistantBookingMobileCard = ({
  filteredBookings,
  handleReached,
  openSampleModal,
  openNavigation,
  handlePayment,
  setPreviewReport,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {filteredBookings.map((item) => (
        <div
          key={item._id}
          className="bg-white border border-border rounded-[10px] overflow-hidden"
        >
          <div
            className={`h-1.5 ${
              item.status === BOOKING_STATUS.COMPLETED
                ? 'bg-green-600'
                : item.status === BOOKING_STATUS.SAMPLE_COLLECTED
                ? 'bg-primary'
                : 'bg-primary'
            }`}
          />
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CircleUser className="text-primary" size={18} />
              </div>
              <div className="flex-1">
                <h2 className="text-xs font-medium text-foreground">{item.patientName}</h2>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Phone size={11} /> {item.phone}
                </p>
              </div>
            </div>

            <div className="mt-3 bg-accent rounded-lg p-3">
              <p className="text-[10px] text-muted-foreground mb-1">Test / Package</p>
              <div className="flex justify-between items-center gap-3">
                <h3 className="text-xs font-medium text-foreground">
                  {item?.test?.title || item?.package?.title || 'N/A'}
                </h3>
                <p className="font-mono font-bold text-primary text-sm whitespace-nowrap">
                  ₹{item?.test?.price || item?.package?.price || 0}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-primary/10 rounded-lg p-2.5">
                <p className="text-[10px] text-muted-foreground">Date</p>
                <p className="text-xs font-medium text-foreground mt-0.5">{item.bookingDate}</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-2.5">
                <p className="text-[10px] text-muted-foreground">Time</p>
                <p className="text-xs font-medium text-foreground mt-0.5">{item.bookingTime}</p>
              </div>
            </div>

            <div className="mt-2 bg-accent rounded-lg p-3">
              <div className="flex gap-2 items-start">
                <MapPin className="text-red-500 mt-0.5 flex-shrink-0" size={12} />
                <div>
                  <p className="text-[10px] text-muted-foreground">Address</p>
                  <p className="text-[11px] text-foreground mt-0.5">{item.address}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-3 flex-wrap">
              <Badge status={item.status}>{item.status}</Badge>
              <Badge status={item.paymentStatus}>{item.paymentStatus}</Badge>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4">
              <Button size="icon" variant="danger" onClick={() => openNavigation(item)}>
                <Route size={14} />
              </Button>
              <Button
                size="icon"
                variant={item.status === BOOKING_STATUS.ASSIGNED ? 'primary' : 'ghost'}
                onClick={() => handleReached(item._id)}
                disabled={item.status !== BOOKING_STATUS.ASSIGNED}
              >
                <MapPinCheck size={14} />
              </Button>
              <Button
                size="icon"
                variant={item.status === BOOKING_STATUS.REACHED ? 'secondary' : 'ghost'}
                onClick={() => openSampleModal(item)}
                disabled={item.status !== BOOKING_STATUS.REACHED}
              >
                <Microscope size={14} />
              </Button>
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
                <Banknote size={14} />
              </Button>
            </div>

            <div className="mt-4">
              {item.report ? (
                <button
                  onClick={() => setPreviewReport(item.report)}
                  className="w-full flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 text-xs font-medium transition"
                >
                  <FileText size={13} />
                  View Report
                </button>
              ) : item.paymentStatus !== PAYMENT_STATUS.PAID ? (
                <div className="bg-red-50 text-red-600 rounded-lg py-2 text-center text-xs font-medium">
                  Payment Pending
                </div>
              ) : (
                <div className="space-y-2"></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LabAssistantBookingMobileCard
