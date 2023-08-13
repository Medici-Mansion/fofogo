'use client'
import { useQuery } from '@tanstack/react-query'
import TranslateApi from '@/APIs/translateApi'

const useGetCountry = () => {
  return useQuery(TranslateApi.queries.getCountryCode)
}

export default useGetCountry
