import React, { useState } from 'react'
import API from '@/services/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { API_ENDPOINTS } from '@/constants/api'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import AuthLayout from '@/components/layout/AuthLayout'
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.post(API_ENDPOINTS.PASSWORD.FORGOT, { email })
      toast.success(data.message)
      navigate(ROUTES.VERIFY_OTP, { state: { email } })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" fullWidth>
            Send OTP
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
export default ForgotPassword
