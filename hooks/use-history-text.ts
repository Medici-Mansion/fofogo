'use client'
import { useQuery } from "react-query";
import TranslateApi from "@/APIs/translateApi";


const useGetHistoryText = () => {
  const { data, isLoading, error } = useQuery(TranslateApi.queries.getHistoryText)

  return {
    data, isLoading, error, key: TranslateApi.queries.getHistoryText.queryKey
  }
}

export default useGetHistoryText