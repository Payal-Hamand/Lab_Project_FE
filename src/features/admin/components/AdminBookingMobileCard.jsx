import React from 'react'
import { Phone, MapPin, Pencil } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { BOOKING_STATUS } from '@/constants/status'

const AdminBookingMobileCard = ({ booking, openEditModal }) => {
  const disabled =
    booking.status === BOOKING_STATUS.COMPLETED || booking.status === BOOKING_STATUS.CANCELLED

  return (
    <div className="bg-white border border-border rounded-[10px] overflow-hidden">
      <div
        className={`h-1.5 ${
          booking.status === BOOKING_STATUS.COMPLETED
            ? 'bg-green-600'
            : booking.status === BOOKING_STATUS.CANCELLED
            ? 'bg-red-500'
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
          <div className="flex flex-col gap-1.5 items-end">
            <Badge status={booking.status}>{booking.status}</Badge>
            <Badge status={booking.paymentStatus}>{booking.paymentStatus}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-accent rounded-lg p-2.5">
            <p className="text-[10px] text-muted-foreground">Test / Package</p>
            <h3 className="text-xs font-medium text-foreground mt-0.5">
              {booking?.test?.title || booking?.package?.title || 'N/A'}
            </h3>
          </div>
          <div className="bg-primary/10 rounded-lg p-2.5">
            <p className="text-[10px] text-muted-foreground">Amount</p>
            <h3 className="font-mono font-bold text-primary text-sm mt-0.5">
              ₹{booking?.test?.price || booking?.package?.price || 0}
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
          <p className="text-[10px] text-muted-foreground">Assigned Lab</p>
          {booking.labOwner?.name ? (
            <>
              <h3 className="text-xs font-medium text-foreground mt-0.5">
                {booking.labOwner.name}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin size={11} /> {booking.labOwner.labAddress}
              </p>
            </>
          ) : (
            <p className="text-[11px] text-muted-foreground mt-1">Not Assigned</p>
          )}
        </div>

        <Button
          onClick={() => openEditModal(booking)}
          disabled={disabled}
          fullWidth
          variant={disabled ? 'default' : 'warning'}
          className="mt-3"
        >
          <Pencil className="inline mr-1.5" size={13} />
          Edit Lab
        </Button>
      </div>
    </div>
  )
}

export default AdminBookingMobileCard