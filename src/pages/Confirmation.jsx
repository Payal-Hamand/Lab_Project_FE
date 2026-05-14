import React from 'react'
import { useNavigate } from 'react-router-dom'

const Confirmation = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-10 rounded-xl shadow text-center w-[400px]'>
        <div className='text-green-500 text-6xl mb-4'>✔</div>

        <h1 className='text-2xl font-bold mb-3'>Booking Confirmed!</h1>

        <p className='text-gray-500 mb-6'>
          Your blood test appointment has been booked successfully.
        </p>

        <button
          onClick={() => navigate('/home')}
          className='w-full bg-blue-600 text-white py-3 rounded-lg'
        >
          Go To Home
        </button>
      </div>
    </div>
  )
}

export default Confirmation