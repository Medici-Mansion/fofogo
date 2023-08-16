'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import * as LucideIcons from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import * as z from 'zod'
import TranslateTextValidation from '@/validation/translate/text.validation'
import { useState } from 'react'
import MicRecorder from './mic-recorder'

interface NavigationPopoverProps {
  select: z.infer<typeof TranslateTextValidation.POST>
  onRecordEnd?: (result: string) => void
}

export function NavigationPopover({
  select,
  onRecordEnd,
}: NavigationPopoverProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const isCheckLangage = Object.keys(select).some((item) => {
    return item === 'to' && select['to'] !== undefined
  })

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className="border-none hover:bg-none hover:bg-accent-none text-icon hover:text-icon hover:shadow-none shadow-none"
        >
          <LucideIcons.CircleEqual className="w-8 h-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-30 relative shadow-none">
        <div className="text-sm text-icon rounded-full absolute right-12 p-2">
          <LucideIcons.Users
            className="w-10 h-10 text-primary border border-primary/10 rounded-full bg-background p-1.5"
            onClick={() => {
              router.push('/speech')
            }}
          />
        </div>
        <div className="text-sm text-icon rounded-full absolute bottom-7 right-0">
          <MicRecorder
            className="w-10 h-10 border border-primary/10 rounded-full bg-background p-1.5 flex justify-center items-center"
            onStartRecording={(start) => {
              if (!isCheckLangage) {
                toast({
                  description: '번역할 국가를 선택해주세요!',
                  variant: 'warning',
                })
                return
              }
              start({
                callback(result) {
                  onRecordEnd && onRecordEnd(result)
                  setOpen(false)
                },
                lang: 'ko',
              })
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
