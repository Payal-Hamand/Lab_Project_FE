import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match')
    }

    try {
      setLoading(true)
      setError('')

      await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      )

      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup Failed')
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
            Create your account
          </p>
        </div>

        {error && (
          <div className='bg-red-100 text-red-600 p-3 rounded-lg mb-4'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block mb-2 font-medium'>Full Name</label>

            <input
              type='text'
              name='name'
              placeholder='Enter full name'
              value={formData.name}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-2 font-medium'>Email</label>

            <input
              type='email'
              name='email'
              placeholder='Enter email'
              value={formData.email}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-2 font-medium'>Password</label>

            <input
              type='password'
              name='password'
              placeholder='Enter password'
              value={formData.password}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500'
              required
            />
          </div>

          <div className='mb-6'>
            <label className='block mb-2 font-medium'>
              Confirm Password
            </label>

            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm password'
              value={formData.confirmPassword}
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className='text-center mt-6 text-gray-600'>
          Already have an account?{' '}
          <Link
            to='/'
            className='text-blue-600 font-semibold'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup