import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-10 rounded-2xl shadow-lg w-[350px] text-center'>
        <div className='text-5xl font-bold text-blue-600 mb-6'>Checked Up</div>

        <button
          onClick={() => navigate('/home')}
          className='w-full bg-blue-600 text-white py-3 rounded-lg mb-4'
        >
          Login
        </button>

        <button className='w-full border border-blue-600 text-blue-600 py-3 rounded-lg'>
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Welcome