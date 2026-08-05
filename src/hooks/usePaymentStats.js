import { useQuery } from '@tanstack/react-query'
import { getLabOwnerPaymentStats, getAdminPaymentStats } from '@/services/payment.service'

export const useLabOwnerPaymentStats = () => {
  return useQuery({
    queryKey: ['payment-stats', 'lab-owner'],
    queryFn: () => getLabOwnerPaymentStats(),
    select: (res) => res.data,
  })
}

export const useAdminPaymentStats = () => {
  return useQuery({
    queryKey: ['payment-stats', 'admin'],
    queryFn: () => getAdminPaymentStats(),
    select: (res) => res.data,
  })
}
