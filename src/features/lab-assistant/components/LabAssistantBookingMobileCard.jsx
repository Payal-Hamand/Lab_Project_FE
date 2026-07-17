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
}) => {
  return (
    <div className="lg:hidden space-y-5">
      {filteredBookings.map((item) => (
        <div
          key={item._id}
          className="overflow-hidden rounded-[28px] bg-white shadow-lg border border-slate-100"
        >
          <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600" />
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <CircleUser className="text-blue-600 text-3xl" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-slate-800 text-lg">{item.patientName}</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Phone size={14} /> {item.phone}
                </p>
              </div>
            </div>
            <div className="mt-4 bg-slate-50 rounded-2xl p-4">
              <p className="text-xs text-gray-500 mb-2">Test / Package</p>
              <div className="flex justify-between items-center gap-4">
                <h3 className="font-bold text-slate-800 text-lg">
                  {item?.test?.title || item?.package?.title || 'N/A'}
                </h3>
                <p className="text-green-600 font-bold text-xl whitespace-nowrap">
                  ₹{item?.test?.price || item?.package?.price || 0}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">Date</p>
                <p className="font-semibold text-blue-900">{item.bookingDate}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">Time</p>
                <p className="font-semibold text-purple-900">{item.bookingTime}</p>
              </div>
            </div>
            <div className="mt-4 bg-slate-50 rounded-xl p-4">
              <div className="flex gap-3">
                <MapPin className="text-red-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm text-slate-700 mt-1">{item.address}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Badge status={item.status}>{item.status}</Badge>
              <Badge status={item.paymentStatus}>{item.paymentStatus}</Badge>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-5">
              <Button
                size="icon"
                variant="danger"
                className="h-12"
                onClick={() => openNavigation(item)}
              >
                <Route className="mx-auto" />
              </Button>
              <Button
                size="icon"
                variant={item.status === BOOKING_STATUS.ASSIGNED ? 'primary' : 'ghost'}
                className="h-12"
                onClick={() => handleReached(item._id)}
                disabled={item.status !== BOOKING_STATUS.ASSIGNED}
              >
                <MapPinCheck className="mx-auto" />
              </Button>
              <Button
                size="icon"
                variant={item.status === BOOKING_STATUS.REACHED ? 'secondary' : 'ghost'}
                className="h-12"
                onClick={() => openSampleModal(item)}
                disabled={item.status !== BOOKING_STATUS.REACHED}
              >
                <Microscope className="mx-auto" />
              </Button>
              <Button
                size="icon"
                variant={
                  item.status === BOOKING_STATUS.SAMPLE_COLLECTED &&
                  item.paymentStatus !== PAYMENT_STATUS.PAID
                    ? 'success'
                    : 'ghost'
                }
                className="h-12"
                onClick={() => handlePayment(item)}
                disabled={
                  item.status !== BOOKING_STATUS.SAMPLE_COLLECTED ||
                  item.paymentStatus === PAYMENT_STATUS.PAID
                }
              >
                <Banknote className="mx-auto" />
              </Button>
            </div>
            <div className="mt-5">
              {item.report ? (
                <a
                  href={item.report}
                  target="_blank"
                  rel="noreferrer"
                  className="
      w-full
      flex
      items-center
      justify-center
      gap-2
      bg-green-600
      hover:bg-green-700
      text-white
      rounded-2xl
      py-3
      "
                >
                  <FileText />
                  View Report
                </a>
              ) : item.paymentStatus !== PAYMENT_STATUS.PAID ? (
                <div
                  className="
      bg-red-50
      text-red-600
      rounded-2xl
      py-3
      text-center
      font-medium
    "
                >
                  Payment Pending
                </div>
              ) : (
                <div className="space-y-3"></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LabAssistantBookingMobileCard
