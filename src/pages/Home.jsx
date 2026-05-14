
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFileUpload, FaCalendarCheck, FaClipboardList } from 'react-icons/fa'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='bg-blue-600 text-white p-4 text-center text-2xl font-bold'>
        Checked Up
      </div>

      <div className='grid grid-cols-3 gap-5 p-8'>
        <div
          onClick={() => navigate('/compare')}
          className='bg-white rounded-xl shadow p-5 text-center cursor-pointer'
        >
          <FaClipboardList className='text-4xl text-blue-600 mx-auto mb-3' />
          <p>Book Test</p>
        </div>

        <div
          onClick={() => navigate('/upload')}
          className='bg-white rounded-xl shadow p-5 text-center cursor-pointer'
        >
          <FaFileUpload className='text-4xl text-blue-600 mx-auto mb-3' />
          <p>Upload Prescription</p>
        </div>

        <div className='bg-white rounded-xl shadow p-5 text-center'>
          <FaCalendarCheck className='text-4xl text-blue-600 mx-auto mb-3' />
          <p>My Bookings</p>
        </div>
      </div>
    </div>
  )
}

export default Home