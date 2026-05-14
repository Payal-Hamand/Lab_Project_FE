import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UploadPrescription = () => {
  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('prescription', file)

    await axios.post('http://localhost:5000/api/upload', formData)

    navigate('/compare')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow w-[400px]'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Upload Prescription</h1>

        <input
          type='file'
          onChange={(e) => setFile(e.target.files[0])}
          className='mb-6'
        />

        <button
          onClick={handleUpload}
          className='w-full bg-blue-600 text-white py-3 rounded-lg'
        >
          Compare & Book
        </button>
      </div>
    </div>
  )
}

export default UploadPrescription