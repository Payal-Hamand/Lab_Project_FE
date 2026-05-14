import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  const tests = [
    {
      id: 1,
      title: 'Full Body Checkup',
      tests: '68 Tests',
      price: '₹599',
    },
    {
      id: 2,
      title: 'Diabetes Care Package',
      tests: '45 Tests',
      price: '₹799',
    },
    {
      id: 3,
      title: 'Heart Health Package',
      tests: '72 Tests',
      price: '₹999',
    },
  ]

  const handleBookNow = () => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/')
    } else {
      navigate('/tests')
    }
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      
      {/* Navbar */}
      <div className='bg-white shadow-md px-10 py-4 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-blue-600'>
          Checked Up
        </h1>

        <div className='flex gap-4'>
         
         <Link to ='/login'>
          <button
            onClick={() => navigate('/')}
            className='border border-blue-600 text-blue-600 px-5 py-2 rounded-xl font-semibold hover:bg-blue-50'
          >
          
            Login
           
          </button>
           </Link>

          <button
            onClick={() => navigate('/signup')}
            className='bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700'
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-12'>
        
        {/* Left Side */}
        <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
          <div className='p-10'>
            <h1 className='text-5xl font-bold text-blue-700 leading-tight mb-4'>
              Full Body Checkup
            </h1>

            <h2 className='text-2xl text-pink-600 font-semibold mb-6'>
              Starting at ₹9 Per Test
            </h2>

            <div className='bg-blue-700 text-white rounded-2xl w-fit px-8 py-5 mb-6'>
              <h2 className='text-4xl font-bold'>68 Tests</h2>
              <p className='text-xl'>At Just ₹599/-</p>
            </div>

            <p className='text-gray-600 text-lg mb-8'>
              Get accurate health reports with home sample collection.
            </p>
            <Link to ='/book-slot'>
            <button
              onClick={handleBookNow}
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold'
            >
              Book A Test
            </button>
            </Link>
          </div>
        </div>

        {/* Right Side Form */}
        <div className='bg-white rounded-3xl shadow-xl p-8'>
          <Link to ='/book-slot'>
          <h1 className='text-4xl font-bold text-blue-700 mb-8'>
            Book Your Test Today
          </h1>
          </Link>

          <div className='bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center justify-between mb-6'>
            <div>
              <h2 className='font-bold text-lg'>
                Free Diet Consultation
              </h2>

              <p className='text-gray-600'>
                With your booking
              </p>
            </div>

            <h2 className='text-3xl font-bold text-green-500'>
              FREE
            </h2>
          </div>

          <input
            type='text'
            placeholder='Enter Name'
            className='w-full border border-gray-300 rounded-xl px-4 py-4 mb-4 outline-none focus:border-blue-500'
          />

          <input
            type='text'
            placeholder='Enter Phone Number'
            className='w-full border border-gray-300 rounded-xl px-4 py-4 mb-4 outline-none focus:border-blue-500'
          />

          <input
            type='text'
            placeholder='Enter City'
            className='w-full border border-gray-300 rounded-xl px-4 py-4 mb-4 outline-none focus:border-blue-500'
          />

          <button
            onClick={handleBookNow}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-bold'
          >
            SUBMIT
          </button>

          <p className='text-gray-500 text-sm mt-4 text-center'>
            Prices may vary according to city.
          </p>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className='max-w-7xl mx-auto px-6 py-10'>
        <h1 className='text-4xl font-bold text-center mb-12'>
          Why Choose Checked Up?
        </h1>

        <div className='grid md:grid-cols-4 gap-6'>
          <div className='bg-white p-6 rounded-2xl shadow text-center'>
            <h2 className='text-xl font-bold mb-2'>
              Honest Pricing
            </h2>

            <p className='text-gray-600'>
              Affordable health packages.
            </p>
          </div>

          <div className='bg-white p-6 rounded-2xl shadow text-center'>
            <h2 className='text-xl font-bold mb-2'>
              Home Collection
            </h2>

            <p className='text-gray-600'>
              Sample collection at your home.
            </p>
          </div>

          <div className='bg-white p-6 rounded-2xl shadow text-center'>
            <h2 className='text-xl font-bold mb-2'>
              Accurate Reports
            </h2>

            <p className='text-gray-600'>
              Trusted and verified reports.
            </p>
          </div>

          <div className='bg-white p-6 rounded-2xl shadow text-center'>
            <h2 className='text-xl font-bold mb-2'>
              Trusted By Patients
            </h2>

            <p className='text-gray-600'>
              Thousands of happy customers.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Tests */}
      <div className='max-w-7xl mx-auto px-6 py-10'>
        <h1 className='text-4xl font-bold mb-10'>
          Popular Health Tests
        </h1>

        <div className='grid md:grid-cols-3 gap-8'>
          {tests.map((test) => (
            <div
              key={test.id}
              className='bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition'
            >
              <h2 className='text-2xl font-bold text-blue-700 mb-3'>
                {test.title}
              </h2>

              <p className='text-gray-600 mb-4'>
                Includes {test.tests}
              </p>

              <div className='flex justify-between items-center'>
                <h1 className='text-4xl font-bold text-pink-600'>
                  {test.price}
                </h1>

                <button
                  onClick={handleBookNow}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold'
                >
                <Link to ='/book-slot'>
                  Book Test
                </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage