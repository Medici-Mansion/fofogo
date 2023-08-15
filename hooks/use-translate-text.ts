import TranslateApi from '@/APIs/translateApi'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
const useTranslateText = (
  options?: typeof TranslateApi.mutations.translateText
) => {
  const { toast } = useToast()
  return useMutation({
    ...options,
    ...TranslateApi.mutations.translateText,
    onError: () => {
      toast({ variant: 'warning', description: '번역에 실패했어요.' })
    },
  })
}

export default useTranslateText
