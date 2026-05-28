import React, {
  useEffect
} from 'react'

import {
  FaCalendarAlt,
  FaClock
} from 'react-icons/fa'

const BookingDateTime = ({
  formData,
  handleChange
}) => {

  const today = new Date()
    .toISOString()
    .split('T')[0]

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

    '07:00 PM'

  ]

  // Available Slots

  const getAvailableTimeSlots = () => {

    // No date selected

    if (!formData.bookingDate) {

      return allTimeSlots
    }

    const todayDate =
      new Date()

    const selectedDate =
      new Date(
        formData.bookingDate
      )

    // Normalize Dates

    todayDate.setHours(
      0,
      0,
      0,
      0
    )

    selectedDate.setHours(
      0,
      0,
      0,
      0
    )

    // Past Date

    if (
      selectedDate < todayDate
    ) {

      return []
    }

    // Future Date

    if (
      selectedDate > todayDate
    ) {

      return allTimeSlots
    }

    // TODAY SLOT FILTER

    const currentTime =
      new Date()

    const currentMinutes =

      currentTime.getHours() *
        60 +

      currentTime.getMinutes()

    return allTimeSlots.filter(
      (slot) => {

        const [time, modifier] =
          slot.split(' ')

        let [hours, minutes] =
          time.split(':')

        hours =
          parseInt(hours)

        minutes =
          parseInt(minutes)

        // Convert to 24h

        if (
          modifier === 'PM' &&
          hours !== 12
        ) {

          hours += 12
        }

        if (
          modifier === 'AM' &&
          hours === 12
        ) {

          hours = 0
        }

        const slotMinutes =

          hours * 60 +
          minutes

        return (
          slotMinutes >
          currentMinutes
        )
      }
    )
  }

  // Auto Remove Invalid Time

  useEffect(() => {

    const availableSlots =
      getAvailableTimeSlots()

    if (

      formData.bookingTime &&

      !availableSlots.includes(
        formData.bookingTime
      )

    ) {

      handleChange({

        target: {

          name: 'bookingTime',

          value: ''

        }
      })
    }

  }, [formData.bookingDate])

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

      {/* Date */}

      <div>

        <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

          <FaCalendarAlt />

          Booking Date

        </label>

        <input
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          min={today}
          required
          className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
        />

      </div>

      {/* Time */}

      <div>

        <label className="font-semibold text-gray-700 flex items-center gap-2 text-sm md:text-base">

          <FaClock />

          Booking Time

        </label>

        <select
          name="bookingTime"
          value={formData.bookingTime}
          onChange={handleChange}
          required
          disabled={
            getAvailableTimeSlots()
              .length === 0
          }
          className="w-full border mt-2 md:mt-3 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base bg-white"
        >

          <option value="">
            Choose Time Slot
          </option>

          {
            getAvailableTimeSlots()
              .map(
                (
                  slot,
                  index
                ) => (

                  <option
                    key={index}
                    value={slot}
                  >

                    {slot}

                  </option>
                )
              )
          }

        </select>

        {/* Warning */}

        {
          formData.bookingDate &&

          getAvailableTimeSlots()
            .length === 0 && (

            <p className="text-red-500 text-sm mt-2">

              Today's booking slots are over.
              Please select another date.

            </p>
          )
        }

      </div>

    </div>
  )
}

export default BookingDateTime