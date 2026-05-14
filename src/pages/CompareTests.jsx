import React from 'react'
import { useNavigate } from 'react-router-dom'

const CompareTests = () => {
  const navigate = useNavigate()

  const tests = [
    {
      name: 'Blood Checkup',
      price: 200,
    },
    {
      name: 'Blood Merced Package',
      price: 120,
    },
    {
      name: 'Phosided Package',
      price: 130,
    },
  ]

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='bg-white rounded-xl p-6 shadow max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>Matched Tests</h1>

        <div className='space-y-4'>
          {tests.map((test, index) => (
            <div
              key={index}
              className='flex justify-between items-center border p-4 rounded-lg'
            >
              <div>
                <h2 className='font-semibold'>{test.name}</h2>
                <p className='text-gray-500'>₹{test.price}</p>
              </div>

              <button
                onClick={() => navigate('/book-slot')}
                className='bg-blue-600 text-white px-4 py-2 rounded-lg'
              >
                Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompareTests