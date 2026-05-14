import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import API from '../services/api'

const Login = () => {

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      const { data } = await API.post('/auth/login', formData)

      login(data)

      // navigate('/dashboard')
      if (data.role === 'admin') {

  navigate('/admin')

} else if (
  data.role === 'lab_assistant'
) {

  navigate('/lab-assistant')

} else {

  navigate('/dashboard')
}

    } catch (error) {

      alert(
        error.response?.data?.message || 'Login Failed'
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f8ff] flex items-center justify-center px-6">

      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-2 max-w-6xl w-full">

        {/* Left Side */}

        <div className="hidden lg:block relative">

          <img
            src="https://images.unsplash.com/photo-1583912267550-d4bcdd0b5e0d?q=80&w=1200&auto=format&fit=crop"
            alt="Lab"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-blue-950/60 flex flex-col justify-center px-12 text-white">

            <h1 className="text-5xl font-bold leading-tight">
              Welcome Back
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-200">
              Login to manage bookings, download reports,
              and book new lab tests easily.
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div className="p-10 lg:p-16">

          <h2 className="text-4xl font-bold text-blue-950">
            Login
          </h2>

          <p className="text-gray-500 mt-3">
            Please login to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full border mt-2 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full border mt-2 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl font-semibold"
            >

              {
                loading ? 'Please Wait...' : 'Login'
              }

            </button>

          </form>

          <p className="mt-8 text-gray-500 text-center">

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