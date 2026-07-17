import React, { useState } from 'react'
import API from '@/services/api'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { API_ENDPOINTS } from '@/constants/api'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import AuthLayout from '@/components/layout/AuthLayout'
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
      const { data } = await API.post(API_ENDPOINTS.PASSWORD.RESET, { email, otp, password })
      toast.success(data.message)
      navigate(ROUTES.LOGIN)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Reset Password</h1>
        <div className="mt-6 space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={handleReset} fullWidth>
            Reset Password
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
export default ResetPassword
