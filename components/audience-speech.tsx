'use client'

import { CountryCode, Message } from '@/APIs/translateApi'
import ChatTexts from './chat-texts'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { ScrollerProps, Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import ChatText from './chat-text'
import UserAvatar from './user-avatar'
import BotAvatar from './bot-avatar'
import { ControllerRenderProps } from 'react-hook-form'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import MicRecorder from './mic-recorder'
import {
  SpeechMessage,
  speechSchame,
} from '@/app/(speech)/(route)/speech/components/speech-inner'

interface AudienceSpeechProps {
  messages: SpeechMessage[]
  codeList?: CountryCode[]
  isLoading: boolean
  field: ControllerRenderProps<z.infer<typeof speechSchame>, 'audience'>
  onSubmit: (args: { text: string; speechType: 'me' | 'audience' }) => void
}

const Scroller = forwardRef<HTMLDivElement, ScrollerProps>(
  ({ style, ...props }, ref) => {
    return (
      <div style={{ ...style }} ref={ref} {...props}>
        {props.children}
      </div>
    )
  }
)
Scroller.displayName = 'Scroller'

const ScrollItem = ({
  data,
  selectedCountry,
  onSelect,
}: {
  index: number
  data: CountryCode
  selectedCountry?: CountryCode
  onSelect?: (countryCode: CountryCode) => void
}) => {
  const ref = useRef(null)

  return (
    <div ref={ref}>
      <motion.div
        key={data.name}
        className={cn(
          data.id === selectedCountry?.id && 'bg-accent-foreground/30',
          'text-center whitespace-nowrap'
        )}
        onClick={() => onSelect && onSelect(data)}
      >
        {data.name}
      </motion.div>
    </div>
  )
}

const AudienceSpeech = ({
  messages,
  codeList,
  field,
  onSubmit,
}: AudienceSpeechProps) => {
  const [open, setOpen] = useState(false)
  const chatRef = useRef<VirtuosoHandle>(null)

  const { onChange, value: selectedCountry, ref } = field

  useEffect(() => {
    const englishCode = codeList!.find((code) => code.code === 'en')
    if (englishCode) {
      onChange(englishCode)
    }
  }, [codeList, onChange, onSubmit])

  useEffect(() => {
    requestIdleCallback(() => {
      chatRef.current?.scrollToIndex({ index: 'LAST' })
    })
  }, [messages])
  return (
    <div className="flex flex-1 flex-col items-center justify-between rotate-180">
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
                    content={data.text || ''}
                    language={data.language.name || ''}
                    isMe={
                      data.from === 'audience' && data.speechType === 'audience'
                    }
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
      </div>
      <div className="w-full relative">
        <MicRecorder
          className="w-20 h-16 text-muted mx-auto"
          loader={{ width: 5, height: 20 }}
          onStartRecording={(start) => {
            if (selectedCountry?.code) {
              start({
                lang: selectedCountry.code,
                callback(result) {
                  onSubmit({
                    speechType: 'audience',
                    text: result,
                  })
                },
              })
            }
          }}
        />

        <div
          className={cn(
            'absolute left-0 h-full w-40 translate-y-1/2 flex items-center justify-center duration-1000',
            open ? '-top-1/2' : '-top-1/2'
          )}
        >
          {!open ? (
            <motion.div
              ref={ref}
              key={selectedCountry?.name}
              layoutId={selectedCountry?.name}
              className="whitespace-nowrap text-center"
              onClick={() => setOpen(true)}
            >
              {selectedCountry ? selectedCountry.name : '언어를 선택해 주세요.'}
            </motion.div>
          ) : (
            <Virtuoso
              onClick={() => setOpen(false)}
              components={{ Scroller }}
              className="w-full overflow-x-hidden"
              data={codeList}
              initialTopMostItemIndex={
                selectedCountry
                  ? codeList?.findIndex(
                      (code) => code.id === selectedCountry.id
                    ) ?? 0 - 2
                  : 0
              }
              itemContent={(_, data) => (
                <ScrollItem
                  data={data}
                  index={_}
                  selectedCountry={selectedCountry}
                  onSelect={(selected) => onChange(selected)}
                />
              )}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AudienceSpeech
