import React, { useEffect, useState } from 'react'
import { verifyOtp } from '@/services/auth.service'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import AuthLayout from '@/components/layout/AuthLayout'
const VerifyOtp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(300)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  const handleVerify = async () => {
    try {
      await verifyOtp(email, otp)
      toast.success('OTP Verified')
      navigate(ROUTES.RESET_PASSWORD, { state: { email, otp } })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Verify OTP</h1>
        <Input
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          containerClassName="mt-6"
        />
        <p className="text-center text-red-600 mt-4">
          OTP Expires In {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </p>
        <Button onClick={handleVerify} fullWidth className="mt-5" variant="success">
          Verify OTP
        </Button>
      </div>
    </AuthLayout>
  )
}
export default VerifyOtp
