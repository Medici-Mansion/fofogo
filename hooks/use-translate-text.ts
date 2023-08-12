import TranslateApi from '@/APIs/translateApi'
import { useMutation } from 'react-query'
import { useToast } from '@/components/ui/use-toast'
const useTranslateText = () => {
  const { toast } = useToast()
  return useMutation({
    ...TranslateApi.mutations.translateText, onSuccess() {
      toast({ description: "번역 완료!" })
    },
    onError(error) {
      console.error("[TranslateApi.mutations.translateText ERROR] : ", error)
      toast({ variant: "warning", description: "번역에 실패했어요." })
    },
  }
  )
}

export default useTranslateText