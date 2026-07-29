import API from '@/services/api'
import { API_ENDPOINTS } from '@/constants/api'

export const getAllTests = () => {
  return API.get(API_ENDPOINTS.TESTS)
}

export const createTest = (testData) => {
  return API.post(API_ENDPOINTS.TESTS, testData)
}

export const updateTest = (testId, testData) => {
  return API.put(`${API_ENDPOINTS.TESTS}/${testId}`, testData)
}

export const deleteTest = (testId) => {
  return API.delete(`${API_ENDPOINTS.TESTS}/${testId}`)
}
