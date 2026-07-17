import { useQuery } from '@tanstack/react-query'
import { getAllTests } from '@/services/test.service'

export const useTests = () => {
  return useQuery({
    queryKey: ['tests'],
    queryFn: () => getAllTests(),
  })
}
