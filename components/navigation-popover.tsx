'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import useVoice from '@/hooks/use-voice'
import * as LucideIcons from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import useGetHistoryText from '@/hooks/use-history-text'
import { useToast } from '@/components/ui/use-toast'
import useTranslateText from '@/hooks/use-translate-text'

export function NavigationPopover({ select }: any) {
  const { mutate } = useTranslateText()
  const { toast } = useToast()
  const { key: historyKey } = useGetHistoryText()
  const router = useRouter()
  const queryClient = useQueryClient()
  const recorder = useVoice()

  const isCheckLangage = Object.keys(select).some((item) => {
    return item === 'to' && select['to'] !== undefined
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className="border-none hover:bg-none hover:bg-accent-none shadow-none"
        >
          <LucideIcons.CircleEqual className="w-8 h-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-30 relative">
        <p className="text-sm text-muted-foreground rounded-full absolute right-12 p-2">
          <LucideIcons.Users
            className="w-10 h-10 text-primary border border-primary/10 rounded-full bg-background p-1.5"
            onClick={() => {
              router.push('/speech')
            }}
          />
        </p>
        <p className="text-sm text-muted-foreground rounded-full absolute bottom-7 right-0">
          <LucideIcons.Mic
            className="w-10 h-10 text-primary border border-primary/10 rounded-full bg-background p-1.5"
            onClick={() => {
              if (!isCheckLangage) {
                toast({
                  description: '번역할 국가를 선택해주세요!',
                  variant: 'warning',
                })
                return
              }
              recorder.start({
                callback(result) {
                  if (result) {
                    const mutateParam = {
                      text: result,
                      from: select.from,
                      to: select.to,
                    }

                    const speech = queryClient.getQueryData(historyKey) as {
                      data: []
                    }
                    queryClient.setQueryData(historyKey, {
                      ...speech,
                      data: [
                        ...(speech?.data || []),
                        {
                          content: result,
                          language: select.ko,
                          role: 'user',
                          createdAt: new Date(),
                          id: new Date() + '',
                        },
                      ],
                    })
                    mutate(mutateParam)
                  }
                },
                lang: 'ko',
              })
            }}
          />
        </p>
      </PopoverContent>
    </Popover>
  )
}
