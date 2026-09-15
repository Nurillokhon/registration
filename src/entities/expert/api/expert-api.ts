import { useGetRequest } from '@/shared/api'
import type { ExpertStatistics } from '../model/types'

const EXPERT_STATISTICS_ENDPOINT = '/main/expert-statistics/'

const EMPTY_EXPERTS: ExpertStatistics[] = []

/** Javob paginatsiyasiz massiv — qidiruv klient tomonida bajariladi. */
export function useExpertStatistics({ enabled = true }: { enabled?: boolean } = {}) {
  const { data, isLoading, isFetching, isError, refetch } = useGetRequest<ExpertStatistics[]>({
    url: EXPERT_STATISTICS_ENDPOINT,
    options: { enabled },
  })

  return {
    experts: Array.isArray(data) ? data : EMPTY_EXPERTS,
    isLoading,
    isFetching,
    isError,
    refetch,
  }
}
