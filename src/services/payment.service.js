import API from './api'
import { API_ENDPOINTS } from '@/constants/api'

export const getLabOwnerPaymentStats = () => {
  return API.get(API_ENDPOINTS.PAYMENT_STATS.LAB_OWNER)
}

export const getAdminPaymentStats = () => {
  return API.get(API_ENDPOINTS.PAYMENT_STATS.ADMIN)
}
