import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { forgotPassword } from '@/services/auth.service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import AuthLayout from '@/components/layout/AuthLayout'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})

const ForgotPassword = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  })
  const onSubmit = async (data) => {
    try {
      const { data: response } = await forgotPassword(data.email)
      toast.success(response.message)
      navigate(ROUTES.VERIFY_OTP, { state: { email: data.email } })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <Input
            type="email"
            required
            placeholder="Enter Email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Button type="submit" loading={isSubmitting} fullWidth>
            Send OTP
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
export default ForgotPassword
