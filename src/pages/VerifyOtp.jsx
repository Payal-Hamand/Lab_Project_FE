import React, { useEffect, useState } from 'react'
import API from '@/services/api'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
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
      await API.post('/pass/verify-otp', {
        email,
        otp,
      })
      toast.success('OTP Verified')
      navigate('/reset-password', {
        state: {
          email,
          otp,
        },
      })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center">Verify OTP</h1>
        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-4 rounded-xl mt-6"
        />
        <p className="text-center text-red-600 mt-4">
          OTP Expires In {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </p>
        <button
          onClick={handleVerify}
          className="w-full mt-5 bg-green-600 text-white py-3 rounded-xl"
        >
          Verify OTP
        </button>
      </div>
    </div>
  )
}
export default VerifyOtp
