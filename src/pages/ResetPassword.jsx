import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { resetPassword } from '@/services/auth.service'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import AuthLayout from '@/components/layout/AuthLayout'

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  const otp = location.state?.otp
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  })
  const onSubmit = async (data) => {
    try {
      const { data: response } = await resetPassword(email, otp, data.password)
      toast.success(response.message)
      navigate(ROUTES.LOGIN)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Reset Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button type="submit" loading={isSubmitting} fullWidth>
            Reset Password
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
export default ResetPassword
