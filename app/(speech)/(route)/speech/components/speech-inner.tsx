'use client'

import { Message } from '@/APIs/translateApi'
import AudienceSpeech from '@/components/audience-speech'
import MySpeech from '@/components/my-speech'
import useGetCountry from '@/hooks/use-country'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import { createContext, useState } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import * as z from 'zod'

const speechSchame = z.object({
  speechType: z.enum(['me', 'audience']),
  me: z.string({
    required_error: '언어를 선택해 주세요.',
  }),
  audience: z.string({
    required_error: '언어를 선택해 주세요.',
  }),
})

export const speechContext = createContext<{
  form: UseFormReturn<z.infer<typeof speechSchame>>
} | null>(null)

const SpeechInner = () => {
  const { data: countryData, isLoading } = useGetCountry()
  const [messages, setMessages] = useState<Message[]>([])

  const form = useForm<z.infer<typeof speechSchame>>()
  const updateMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  return (
    <speechContext.Provider value={{ form }}>
      <div className="h-full flex flex-col py-4 divide-y-[1px]  relative">
        <Link href="/" className="absolute z-50 top-8 left-2">
          <LucideIcons.ArrowLeftCircle />
        </Link>

        <AudienceSpeech
          codeList={countryData}
          updateMessage={updateMessage}
          messages={messages}
          isLoading={isLoading}
        />
        <MySpeech
          codeList={countryData}
          updateMessage={updateMessage}
          messages={messages}
          isLoading={isLoading}
        />
      </div>
    </speechContext.Provider>
  )
}

export default SpeechInner
