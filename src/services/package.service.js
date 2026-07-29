import API from '@/services/api'
import { API_ENDPOINTS } from '@/constants/api'

export const getAllPackages = () => {
  return API.get(API_ENDPOINTS.PACKAGES)
}

export const createPackage = (packageData) => {
  return API.post(API_ENDPOINTS.PACKAGES, packageData)
}

export const updatePackage = (packageId, packageData) => {
  return API.put(`${API_ENDPOINTS.PACKAGES}/${packageId}`, packageData)
}

export const deletePackage = (packageId) => {
  return API.delete(`${API_ENDPOINTS.PACKAGES}/${packageId}`)
}
