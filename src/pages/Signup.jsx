import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa'
import API from '@/services/api'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
const Signup = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (location.state?.message) {
      toast.info(location.state.message)
      window.history.replaceState({}, document.title)
    }
  }, [])
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await API.post('/auth/register', formData)
      login(data)
      toast.success('Account Created Successfully')
      if (location.state?.redirectTo) {
        navigate(location.state.redirectTo, {
          state: {
            selectedItem: location.state?.selectedItem,
            bookingType: location.state?.bookingType,
          },
        })
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup Failed')
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
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
            alt="Lab"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/70 flex flex-col justify-center px-12 text-white">
            <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm w-fit mb-6">
              Checked Up
            </div>
            <h1 className="text-5xl font-bold leading-tight">Create Your Account</h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Join Checked Up today and book lab tests online with secure reports and home
              collection.
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div className="p-5 sm:p-8 md:p-12 lg:p-16">
          {/* Top */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition text-sm md:text-base"
            >
              <FaArrowLeft />
              Home
            </button>
            <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs md:text-sm font-medium">
              Signup
            </div>
          </div>
          {/* Heading */}
          <div className="mt-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950">Create Account</h2>
            <p className="text-gray-500 mt-3 text-sm md:text-base leading-7">
              Signup to continue your healthcare journey.
            </p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 md:mt-10 space-y-5 md:space-y-6">
            {/* Name */}
            <div>
              <label className="font-medium text-gray-700 text-sm md:text-base">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                onChange={handleChange}
                required
                className="w-full border mt-2 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 outline-none focus:border-blue-500 text-sm md:text-base"
              />
            </div>
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
              <label className="font-medium text-gray-700 text-sm md:text-base">Password</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create password"
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 pr-14 outline-none focus:border-blue-500 text-sm md:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base"
            >
              {loading ? 'Please Wait...' : 'Create Account'}
            </button>
          </form>
          {/* Bottom */}
          <p className="mt-8 text-gray-500 text-center text-sm md:text-base">
            Already have an account?
            <Link to="/login" className="text-blue-600 font-semibold ml-2">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Signup
