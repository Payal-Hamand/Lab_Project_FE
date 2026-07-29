import React from 'react'
import Badge from '@/components/ui/Badge'

const BookingStatusBadge = ({ status }) => {
  return <Badge status={status}>{status}</Badge>
}

export default BookingStatusBadge
