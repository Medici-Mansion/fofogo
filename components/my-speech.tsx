'use client'

import * as LucideIcons from 'lucide-react'
import { CountryCode, Message } from '@/APIs/translateApi'
import * as z from 'zod'
import ChatTexts from './chat-texts'
import { useEffect, useRef, useState } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import ChatText from './chat-text'
import UserAvatar from './user-avatar'
import BotAvatar from './bot-avatar'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
interface MySpeechProps {
  messages: Message[]
  updateMessage: (message: Message) => void
  codeList?: CountryCode[]
  isLoading: boolean
}

const schema = z.object({
  codeId: z.string({
    required_error: '??',
  }),
})

const MySpeech = ({
  messages,
  isLoading,
  updateMessage,
  codeList,
}: MySpeechProps) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>()
  const [open, setOpen] = useState(false)
  const {} = useForm<z.infer<typeof schema>>()
  const chatRef = useRef<VirtuosoHandle>(null)

  useEffect(() => {
    const krhCode = codeList?.find((code) => code.code === 'ko')
    if (krhCode) {
      setSelectedCountry(krhCode)
    }
  }, [])
  return (
    <div className="flex flex-1 flex-col items-center justify-between">
      <div className="flex flex-1 w-full ">
        {messages.length ? (
          <ChatTexts
            className="w-full"
            mref={chatRef}
            data={messages}
            initialTopMostItemIndex={messages.length}
            firstItemIndex={messages.length}
            itemContent={(_, data) => {
              return (
                <div>
                  <ChatText
                    content={data.content || ''}
                    language={data.language.name || ''}
                    isMe={data.role === 'user'}
                    myIcon={<UserAvatar />}
                    senderIcon={<BotAvatar />}
                  />
                </div>
              )
            }}
          />
        ) : (
          <div className="grow w-full p-4 text-2xl text-muted-foreground">
            탭해서 말하기
          </div>
        )}
        <div className="absolute right-2 h-20 w-1/2">
          {!open ? (
            <div className="whitespace-nowrap" onClick={() => setOpen(true)}>
              {selectedCountry ? selectedCountry.name : '언어를 선택해 주세요.'}
            </div>
          ) : (
            <Virtuoso
              onClick={() => setOpen(false)}
              data={codeList}
              initialTopMostItemIndex={
                selectedCountry
                  ? codeList?.findIndex(
                      (code) => code.id === selectedCountry.id
                    )
                  : 0
              }
              itemContent={(_, data) => {
                return (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      data.id === selectedCountry?.id &&
                        'bg-accent-foreground/30'
                    )}
                    onClick={() => setSelectedCountry(data)}
                  >
                    {data.name}
                  </motion.div>
                )
              }}
            />
          )}
        </div>
      </div>
      <LucideIcons.Mic className=" w-20 h-16 text-muted" />
    </div>
  )
}

export default MySpeech
