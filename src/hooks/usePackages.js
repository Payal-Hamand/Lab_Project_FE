import { useQuery } from '@tanstack/react-query'
import { getAllPackages } from '@/services/package.service'

export const usePackages = () => {
  return useQuery({
    queryKey: ['packages'],
    queryFn: () => getAllPackages(),
  })
}
