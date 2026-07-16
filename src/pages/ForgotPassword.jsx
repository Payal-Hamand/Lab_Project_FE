import React, { useState } from 'react'
import API from '@/services/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await API.post('/pass/forgot-password', { email })

      toast.success(data.message)

      navigate('/verify-otp', {
        state: { email },
      })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl">Send OTP</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
