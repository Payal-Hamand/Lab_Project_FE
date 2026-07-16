import React, { useState } from 'react'
import API from '@/services/api'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { API_ENDPOINTS } from '@/constants/api'
const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  const otp = location.state?.otp
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleReset = async () => {
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match')
    }
    try {
      const { data } = await API.post(API_ENDPOINTS.PASSWORD.RESET, {
        email,
        otp,
        password,
      })
      toast.success(data.message)
      navigate(ROUTES.LOGIN)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Reset Password</h1>
        <div className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />
          <button onClick={handleReset} className="w-full bg-blue-600 text-white py-3 rounded-xl">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  )
}
export default ResetPassword
