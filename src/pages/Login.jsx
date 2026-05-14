import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
      setError('')

      const { data } = await axios.post(
        'https://lab-project-be.vercel.app/api/auth/login',
        formData
      )

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      navigate('/home')
    } catch (err) {
      setError(err.response?.data?.message || 'Login Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 px-4'>
      <div className='bg-white w-full max-w-md rounded-3xl shadow-2xl p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-blue-600 mb-2'>
            Checked Up
          </h1>

          <p className='text-gray-500'>
            Welcome back! Login to continue.
          </p>
        </div>

        {error && (
          <div className='bg-red-100 text-red-600 p-3 rounded-lg mb-4'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-5'>
            <label className='block mb-2 font-medium'>Email</label>

            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500'
              required
            />
          </div>

          <div className='mb-6'>
            <label className='block mb-2 font-medium'>Password</label>

            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold'
          >
            {loading ? 'Please Wait...' : 'Login'}
          </button>
        </form>

        <p className='text-center mt-6 text-gray-600'>
          Don't have an account?{' '}
          <Link
            to='/signup'
            className='text-blue-600 font-semibold'
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login