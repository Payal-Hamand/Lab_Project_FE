import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMyBookings,
  getAllBookings,
  getLabOwnerBookings,
  getAssignedBookings,
  createBooking,
} from '@/services/booking.service'

export const useMyBookings = () => {
  return useQuery({
    queryKey: ['bookings', 'my'],
    queryFn: () => getMyBookings(),
  })
}

export const useAllBookings = () => {
  return useQuery({
    queryKey: ['bookings', 'all'],
    queryFn: () => getAllBookings(),
  })
}

export const useLabOwnerBookings = () => {
  return useQuery({
    queryKey: ['bookings', 'lab-owner'],
    queryFn: () => getLabOwnerBookings(),
  })
}

export const useAssignedBookings = () => {
  return useQuery({
    queryKey: ['bookings', 'assigned'],
    queryFn: () => getAssignedBookings(),
  })
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}
