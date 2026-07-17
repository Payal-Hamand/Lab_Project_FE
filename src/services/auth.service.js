import API from '@/services/api'
import { API_ENDPOINTS } from '@/constants/api'

export const loginUser = (credentials) => {
  return API.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
}

export const registerUser = (userData) => {
  return API.post(API_ENDPOINTS.AUTH.REGISTER, userData)
}

export const forgotPassword = (email) => {
  return API.post(API_ENDPOINTS.PASSWORD.FORGOT, { email })
}

export const verifyOtp = (email, otp) => {
  return API.post(API_ENDPOINTS.PASSWORD.VERIFY_OTP, { email, otp })
}

export const resetPassword = (email, otp, password) => {
  return API.post(API_ENDPOINTS.PASSWORD.RESET, { email, otp, password })
}
