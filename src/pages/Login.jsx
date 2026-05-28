import React, {
  useContext,
  useState
} from 'react'
import {
  useLocation
} from 'react-router-dom'
import {
  Link,
  useNavigate
} from 'react-router-dom'

import {
  toast
} from 'react-toastify'

import {
  FaArrowLeft
} from 'react-icons/fa'

import {
  AuthContext
} from '../context/AuthContext'

import API from '../services/api'

const Login = () => {

  const navigate = useNavigate()
  const location =
  useLocation()

  const { login } =
    useContext(AuthContext)

  const [formData, setFormData] =
    useState({

      email: '',

      password: ''

    })

  const [loading, setLoading] =
    useState(false)

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      const { data } =
        await API.post(
          '/auth/login',
          formData
        )

      login(data)

      toast.success(
        'Login Successful'
      )

   if (
  location.state
    ?.redirectTo
) {

  navigate(

    location.state
      .redirectTo,

    {

      state: {

        selectedItem:

          location.state
            ?.selectedItem,

        bookingType:

          location.state
            ?.bookingType
      }
    }
  )

} else if (
  data.role === 'admin'
) {

  navigate('/admin')

} else if (
  data.role ===
  'lab_assistant'
) {

  navigate(
    '/lab-assistant'
  )

} else if (
  data.role ===
  'lab_owner'
) {

  navigate('/lab-owner')

} else {

  navigate('/dashboard')
}
    } catch (error) {

      toast.error(

        error.response?.data
          ?.message ||

          'Login Failed'
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen bg-[#f4f8ff] flex items-center justify-center px-4 sm:px-6 py-6 md:py-10">

      <div className="bg-white rounded-3xl md:rounded-[40px] shadow-xl overflow-hidden grid lg:grid-cols-2 max-w-6xl w-full">

        {/* Left Side */}

        <div className="hidden lg:block relative">

          <img
            src="https://images.unsplash.com/photo-1583912267550-d4bcdd0b5e0d?q=80&w=1200&auto=format&fit=crop"
            alt="Lab"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-blue-950/70 flex flex-col justify-center px-12 text-white">

            <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm w-fit mb-6">

              MediLab Healthcare

            </div>

            <h1 className="text-5xl font-bold leading-tight">

              Welcome Back

            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-200">

              Login to manage bookings,
              download reports and access
              healthcare services easily.

            </p>

          </div>

        </div>

        {/* Right Side */}

        <div className="p-5 sm:p-8 md:p-12 lg:p-16">

          {/* Top */}

          <div className="flex items-center justify-between">

            <button
              onClick={() =>
                navigate('/')
              }
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition text-sm md:text-base"
            >

              <FaArrowLeft />

              Home

            </button>

            <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs md:text-sm font-medium">

              Login

            </div>

          </div>

          {/* Heading */}

          <div className="mt-8">

            <h2 className="text-3xl md:text-4xl font-bold text-blue-950">

              Login Account

            </h2>

            <p className="text-gray-500 mt-3 text-sm md:text-base leading-7">

              Login to continue your
              healthcare journey.

            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 md:mt-10 space-y-5 md:space-y-6"
          >

            {/* Email */}

            <div>

              <label className="font-medium text-gray-700 text-sm md:text-base">

                Email Address

              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
              />

            </div>

            {/* Password */}

            <div>

              <label className="font-medium text-gray-700 text-sm md:text-base">

                Password

              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
              />

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base"
            >

              {
                loading
                  ? 'Please Wait...'
                  : 'Login'
              }

            </button>

          </form>

          {/* Bottom */}

          <p className="mt-8 text-gray-500 text-center text-sm md:text-base">

            Don’t have an account?

            <Link
              to="/signup"
              className="text-blue-600 font-semibold ml-2"
            >

              Signup

            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Login