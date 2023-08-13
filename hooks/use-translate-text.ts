import TranslateApi from '@/APIs/translateApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
const useTranslateText = () => {
  const { refresh } = useRouter()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    ...TranslateApi.mutations.translateText,
    onSuccess(data) {
      queryClient.invalidateQueries(
        TranslateApi.queries.getHistoryText.queryKey
      )
      toast({ description: '번역 완료!', duration: 2000 })
      refresh()
    },
    onError(error) {
      // console.error('[TranslateApi.mutations.translateText ERROR] : ', error)
      toast({ variant: 'warning', description: '번역에 실패했어요.' })
    },
  })
}

export default useTranslateText
