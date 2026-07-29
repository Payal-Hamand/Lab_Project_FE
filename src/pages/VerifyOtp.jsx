import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { verifyOtp } from '@/services/auth.service'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import AuthLayout from '@/components/layout/AuthLayout'

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
})

const VerifyOtp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  const [timeLeft, setTimeLeft] = React.useState(300)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
  })
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  const onSubmit = async (data) => {
    try {
      await verifyOtp(email, data.otp)
      toast.success('OTP Verified')
      navigate(ROUTES.RESET_PASSWORD, { state: { email, otp: data.otp } })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Verify OTP</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            maxLength={6}
            placeholder="Enter OTP"
            error={errors.otp?.message}
            containerClassName="mt-6"
            {...register('otp')}
          />
          <p className="text-center text-red-600 mt-4">
            OTP Expires In {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </p>
          <Button type="submit" loading={isSubmitting} fullWidth className="mt-5" variant="success">
            Verify OTP
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
export default VerifyOtp
