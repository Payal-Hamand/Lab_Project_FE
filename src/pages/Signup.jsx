import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { registerUser } from '@/services/auth.service'
import useAuth from '@/hooks/useAuth'
import { ROUTES } from '@/constants/routes'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import AuthLayout from '@/components/layout/AuthLayout'

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const Signup = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  })
  useEffect(() => {
    if (location.state?.message) {
      toast.info(location.state.message)
      window.history.replaceState({}, document.title)
    }
  }, [])
  const onSubmit = async (data) => {
    try {
      const { data: response } = await registerUser(data)
      login(response)
      toast.success('Account Created Successfully')
      if (location.state?.redirectTo) {
        navigate(location.state.redirectTo, {
          state: {
            selectedItem: location.state?.selectedItem,
            bookingType: location.state?.bookingType,
          },
        })
      } else {
        navigate(ROUTES.DASHBOARD)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup Failed')
    }
  }
  return (
    <AuthLayout>
      <div className="bg-white rounded-3xl md:rounded-[40px] shadow-xl overflow-hidden grid lg:grid-cols-2 max-w-6xl w-full">
        <div className="hidden lg:block relative">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
            alt="Lab"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/70 flex flex-col justify-center px-12 text-white">
            <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm w-fit mb-6">
              Checked Up
            </div>
            <h1 className="text-5xl font-bold leading-tight">Create Your Account</h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Join Checked Up today and book lab tests online with secure reports and home
              collection.
            </p>
          </div>
        </div>
        <div className="p-5 sm:p-8 md:p-12 lg:p-16">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate(ROUTES.HOME)}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft /> Home
            </Button>
            <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs md:text-sm font-medium">
              Signup
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950">Create Account</h2>
            <p className="text-gray-500 mt-3 text-sm md:text-base leading-7">
              Signup to continue your healthcare journey.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 md:mt-10 space-y-5 md:space-y-6">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register('email')}
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create password"
                error={errors.password?.message}
                className="pr-14"
                {...register('password')}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-9 text-gray-400 hover:text-blue-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            <Button type="submit" loading={isSubmitting} fullWidth size="lg">
              Create Account
            </Button>
          </form>
          <p className="mt-8 text-gray-500 text-center text-sm md:text-base">
            Already have an account?
            <Link to={ROUTES.LOGIN} className="text-blue-600 font-semibold ml-2">
              Login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
export default Signup
