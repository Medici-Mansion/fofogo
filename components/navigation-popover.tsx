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

export function NavigationPopover() {
  const router = useRouter()

  const recorder = useVoice()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className="border-none hover:bg-none hover:bg-accent-none"
        >
          <LucideIcons.CircleEqual className="w-8 h-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-30 relative">
        <p className="text-sm text-muted-foreground rounded-full absolute right-12 p-2">
          <LucideIcons.Users
            className="w-10 h-10 text-[#68cede] border border-primary/10 rounded-full bg-background p-1.5"
            onClick={() => {
              router.push('/speech')
            }}
          />
        </p>
        <p className="text-sm text-muted-foreground rounded-full absolute bottom-7 right-0">
          <LucideIcons.Mic
            className="w-10 h-10 text-[#68cede] border border-primary/10 rounded-full bg-background p-1.5"
            onClick={() => {
              recorder.start({
                callback(result) {
                  console.log(result)
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
