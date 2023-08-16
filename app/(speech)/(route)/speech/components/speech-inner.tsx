'use client'

import { Message } from '@/APIs/translateApi'
import AudienceSpeech from '@/components/audience-speech'
import MySpeech from '@/components/my-speech'
import useGetCountry from '@/hooks/use-country'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const SpeechInner = () => {
  const { data: countryData, isLoading } = useGetCountry()
  const [messages, setMessages] = useState<Message[]>([])
  const updateMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  return (
    <div className="h-full flex flex-col p-4 divide-y-[1px]  relative">
      <Link href="/" className="absolute z-50">
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
  )
}

export default SpeechInner
