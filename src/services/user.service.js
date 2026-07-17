import API from '@/services/api'
import { API_ENDPOINTS } from '@/constants/api'

export const getAllLabOwners = () => {
  return API.get(API_ENDPOINTS.ADMIN.LAB_OWNERS)
}

export const getBookingLabOwners = () => {
  return API.get(API_ENDPOINTS.BOOKINGS.LAB_OWNERS)
}

export const createLabOwner = (data) => {
  return API.post(API_ENDPOINTS.ADMIN.CREATE_LAB_OWNER, data)
}

export const createLabAssistant = (data) => {
  return API.post(API_ENDPOINTS.ADMIN.CREATE_LAB_ASSISTANT, data)
}

export const getMyAssistants = () => {
  return API.get(API_ENDPOINTS.USERS.MY_ASSISTANTS)
}

export const createPaymentOrder = (data) => {
  return API.post(API_ENDPOINTS.PAYMENT.CREATE, data)
}

export const verifyPayment = (data) => {
  return API.post(API_ENDPOINTS.PAYMENT.VERIFY, data)
}
