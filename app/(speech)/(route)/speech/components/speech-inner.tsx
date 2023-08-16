'use client'

import AudienceSpeech from '@/components/audience-speech'
import MySpeech from '@/components/my-speech'
import useGetCountry from '@/hooks/use-country'
import useTranslateText from '@/hooks/use-translate-text'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import TranslateApi, { CountryCode } from '@/APIs/translateApi'
window.requestIdleCallback = (cb) => {
  var start = Date.now()
  const timeout = setTimeout(() => {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 100 - (Date.now() - start))
      },
    })
  }, 1)
  return timeout as unknown as number
}

export const speechSchame = z.object({
  speechType: z.enum(['me', 'audience']),
  me: z.object(
    {
      id: z.string(),
      code: z.string(),
      name: z.string(),
    },
    { required_error: '언어를 선택해 주세요.' }
  ),
  audience: z.object(
    {
      id: z.string(),
      code: z.string(),
      name: z.string(),
    },
    { required_error: '언어를 선택해 주세요.' }
  ),
  text: z.string({
    required_error: '번역할 내용이 없어요.',
  }),
})
type SpeechType = 'audience' | 'me'
export interface SpeechMessage {
  from: SpeechType
  to: SpeechType
  language: CountryCode
  text: string
  speechType: SpeechType
}

const SpeechInner = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const { data: countryData, isLoading } = useGetCountry()
  const [messages, setMessages] = useState<SpeechMessage[]>([])
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<z.infer<typeof speechSchame>>({
    resolver: zodResolver(speechSchame),
  })
  const { mutate } = useMutation({
    ...TranslateApi.mutations.translateSingle,
    onSuccess(data) {
      const { me, audience, speechType } = getValues()
      const isMe = speechType === 'me'
      const from = isMe ? 'audience' : 'me'
      updateMessage({
        from,
        to: isMe ? 'me' : 'audience',
        language: isMe ? audience : me,
        text: data.data,
        speechType,
      })
    },
  })
  const onValid = useCallback(
    (data: z.infer<typeof speechSchame>) => {
      const isMe = data.speechType === 'me'
      updateMessage({
        from: data.speechType,
        to: isMe ? 'audience' : 'me',
        text: data.text,
        language: isMe ? data.me : data.audience,
        speechType: data.speechType,
      })
      mutate({
        text: data.text,
        from: isMe ? data.me.code : data.audience.code,
        to: isMe ? data.audience.code : data.me.code,
      })
    },
    [mutate]
  )

  const updateMessage = (message: SpeechMessage) => {
    setMessages((prev) => [...prev, message])
  }

  const onSubmit = useCallback(
    ({ text, speechType }: { text: string; speechType: 'me' | 'audience' }) => {
      setValue('text', text)
      setValue('speechType', speechType)
      handleSubmit(onValid)()
    },
    [handleSubmit, onValid, setValue]
  )

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onValid)}
      className="h-full flex flex-col py-4 divide-y-[1px]  relative"
    >
      <Link href="/" className="absolute z-50 top-8 left-2">
        <LucideIcons.ArrowLeftCircle />
      </Link>
      <Controller
        name="audience"
        control={control}
        defaultValue={{
          id: 'ba3a9a7c-e237-4aab-b68d-9c6962f07921',
          code: 'en',
          name: '영어',
        }}
        render={({ field }) => (
          <AudienceSpeech
            field={field}
            codeList={countryData}
            onSubmit={onSubmit}
            messages={messages.filter(
              (message) =>
                message.from === 'audience' ||
                (message.to === 'audience' &&
                  message.language.code === getValues().audience.code)
            )}
            isLoading={isLoading}
          />
        )}
      />
      <Controller
        name="me"
        control={control}
        defaultValue={{
          id: '497e88db-b713-44d6-b119-5e52d6b503a1',
          code: 'ko',
          name: '한국어',
        }}
        render={({ field }) => (
          <MySpeech
            field={field}
            codeList={countryData}
            messages={messages.filter(
              (message) =>
                message.from === 'me' ||
                (message.to === 'me' &&
                  message.language.code === getValues().me.code)
            )}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
        )}
      />
    </form>
  )
}

export default SpeechInner
