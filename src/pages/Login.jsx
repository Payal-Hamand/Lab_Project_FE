import React, { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa'
import useAuth from '@/hooks/useAuth'
import { loginUser } from '@/services/auth.service'
import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import AuthLayout from '@/components/layout/AuthLayout'
const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await loginUser(formData)
      login(data)
      toast.success('Login Successful')
      if (location.state?.redirectTo) {
        navigate(location.state.redirectTo, {
          state: {
            selectedItem: location.state?.selectedItem,
            bookingType: location.state?.bookingType,
          },
        })
      } else if (data.role === ROLES.ADMIN) {
        navigate(ROUTES.ADMIN)
      } else if (data.role === ROLES.LAB_ASSISTANT) {
        navigate(ROUTES.LAB_ASSISTANT)
      } else if (data.role === ROLES.LAB_OWNER) {
        navigate(ROUTES.LAB_OWNER)
      } else {
        navigate(ROUTES.DASHBOARD)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login Failed')
    } finally {
      setLoading(false)
    }
  }
  return (
    <AuthLayout>
      <div className="bg-white rounded-3xl md:rounded-[40px] shadow-xl overflow-hidden grid lg:grid-cols-2 max-w-6xl w-full">
        <div className="hidden lg:block relative">
          <img
            src="https://images.unsplash.com/photo-1583912267550-d4bcdd0b5e0d?q=80&w=1200&auto=format&fit=crop"
            alt="Lab"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/70 flex flex-col justify-center px-12 text-white">
            <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm w-fit mb-6">
              MediLab Healthcare
            </div>
            <h1 className="text-5xl font-bold leading-tight">Welcome Back</h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Login to manage bookings, download reports and access healthcare services easily.
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
              <FaArrowLeft /> Home
            </Button>
            <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs md:text-sm font-medium">
              Login
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950">Login Account</h2>
            <p className="text-gray-500 mt-3 text-sm md:text-base leading-7">
              Login to continue your healthcare journey.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 md:mt-10 space-y-5 md:space-y-6">
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
            <div>
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                  className="pr-14"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-9 text-gray-400 hover:text-blue-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
              <div className="flex justify-end mt-2">
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button type="submit" loading={loading} fullWidth size="lg">
              Login
            </Button>
          </form>
          <p className="mt-8 text-gray-500 text-center text-sm md:text-base">
            Don't have an account?
            <Link to={ROUTES.SIGNUP} className="text-blue-600 font-semibold ml-2">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
export default Login
