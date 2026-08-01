import React, { useEffect } from 'react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
const BookingDateTime = ({ formData, handleChange }) => {
  const today = new Date().toISOString().split('T')[0]
  // Time Slots
  const allTimeSlots = [
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
  ]
  // Available Slots
  const getAvailableTimeSlots = () => {
    // No date selected
    if (!formData.bookingDate) {
      return allTimeSlots
    }
    const todayDate = new Date()
    const selectedDate = new Date(formData.bookingDate)
    // Normalize Dates
    todayDate.setHours(0, 0, 0, 0)
    selectedDate.setHours(0, 0, 0, 0)
    // Past Date
    if (selectedDate < todayDate) {
      return []
    }
    // Future Date
    if (selectedDate > todayDate) {
      return allTimeSlots
    }
    // TODAY SLOT FILTER
    const currentTime = new Date()
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    return allTimeSlots.filter((slot) => {
      const [time, modifier] = slot.split(' ')
      let [hours, minutes] = time.split(':')
      hours = parseInt(hours)
      minutes = parseInt(minutes)
      // Convert to 24h
      if (modifier === 'PM' && hours !== 12) {
        hours += 12
      }
      if (modifier === 'AM' && hours === 12) {
        hours = 0
      }
      const slotMinutes = hours * 60 + minutes
      return slotMinutes > currentMinutes
    })
  }
  // Auto Remove Invalid Time
  useEffect(() => {
    const availableSlots = getAvailableTimeSlots()
    if (formData.bookingTime && !availableSlots.includes(formData.bookingTime)) {
      handleChange({
        target: {
          name: 'bookingTime',
          value: '',
        },
      })
    }
  }, [formData.bookingDate])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
      {/* Date */}
      <Input
        label="Booking Date"
        type="date"
        name="bookingDate"
        value={formData.bookingDate}
        onChange={handleChange}
        min={today}
        required
      />
      {/* Time */}
      <Select
        label="Booking Time"
        name="bookingTime"
        value={formData.bookingTime}
        onChange={handleChange}
        required
        disabled={getAvailableTimeSlots().length === 0}
      >
        <option value="">Choose Time Slot</option>
        {getAvailableTimeSlots().map((slot, index) => (
          <option key={index} value={slot}>
            {slot}
          </option>
        ))}
      </Select>
      {/* Warning */}
      {formData.bookingDate && getAvailableTimeSlots().length === 0 && (
        <p className="text-red-500 text-sm mt-2">
          Today's booking slots are over. Please select another date.
        </p>
      )}
    </div>
  )
}
export default BookingDateTime
