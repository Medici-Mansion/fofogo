'use client'

import * as LucideIcons from 'lucide-react'
import { CountryCode, Message } from '@/APIs/translateApi'
import ChatTexts from './chat-texts'
import { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { ScrollerProps, Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import ChatText from './chat-text'
import UserAvatar from './user-avatar'
import BotAvatar from './bot-avatar'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import MicRecorder from './mic-recorder'
import useTranslateText from '@/hooks/use-translate-text'
import { speechContext } from '@/app/(speech)/(route)/speech/components/speech-inner'

interface AudienceSpeechProps {
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
  index,
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

const AudienceSpeech = ({ messages, codeList }: AudienceSpeechProps) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>()
  const [open, setOpen] = useState(false)
  const {} = useForm<z.infer<typeof schema>>()
  const { mutate } = useTranslateText()
  const chatRef = useRef<VirtuosoHandle>(null)

  const test = useContext(speechContext)
  console.log(test)
  useEffect(() => {
    const englishCode = codeList!.find((code) => code.code === 'en')
    if (englishCode) {
      setSelectedCountry(englishCode)
    }
  }, [])
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
                  mutate({
                    text: result,
                    from: selectedCountry.code,
                    to: 'ko',
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
                  onSelect={(selected) => setSelectedCountry(selected)}
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
