import React from 'react'
import { useNavigate } from 'react-router-dom'

const BookSlot = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-xl shadow w-[400px]'>
        <h1 className='text-2xl font-bold mb-6'>Book Slot</h1>

        <input
          type='date'
          className='w-full border p-3 rounded-lg mb-4'
        />

        <select className='w-full border p-3 rounded-lg mb-4'>
          <option>10:00 AM</option>
          <option>12:00 PM</option>
          <option>02:00 PM</option>
        </select>

        <button
          onClick={() => navigate('/confirmation')}
          className='w-full bg-blue-600 text-white py-3 rounded-lg'
        >
          Confirm Booking
        </button>
      </div>
    </div>
  )
}

export default BookSlot