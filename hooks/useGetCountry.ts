'use client'
import { useQuery } from "react-query";
import TranslateApi from "@/APIs/translateApi";


const useGetCountry = () => {
  const { data, isLoading, error } = useQuery(TranslateApi.getCountryCode)

  return {
    data, isLoading, error
  }
}

export default useGetCountry