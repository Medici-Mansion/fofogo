'use client'
import * as z from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import ChatTexts from './chat-texts'
import useGetCountry from '@/hooks/use-country'
import TranslateTextValidation from '@/validation/translate/text.validation'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Validation } from '@/validation/translate/text.validation'
import useTranslateText from '@/hooks/use-translate-text'
import useGetHistoryText from '@/hooks/use-history-text'
import { NavigationPopover } from './navigation-popover'
import { motion } from 'framer-motion'
import ChatText from './chat-text'
import { VirtuosoHandle } from 'react-virtuoso'
import { Message } from '@/APIs/translateApi'
import { v4 as uuid } from 'uuid'
import UserAvatar from './user-avatar'
import BotAvatar from './bot-avatar'

// IOS requestIdleCallback 지원 X -> 같은 방식으로 윈도우 객체에 강제주입
window.requestIdleCallback = (cb) => {
  var start = Date.now()
  const timeout = setTimeout(() => {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start))
      },
    })
  }, 1)
  return timeout as unknown as number
}

const TextForm = () => {
  const { toast } = useToast()
  const { data: countryData, isLoading } = useGetCountry()
  const chatRef = useRef<VirtuosoHandle>(null)
  const { data: historyData, fetchNextPage } = useGetHistoryText()

  const [messages, setMessages] = useState<Message[]>([])
  const updateMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
    requestIdleCallback(() => {
      chatRef?.current?.scrollToIndex({ index: 'LAST' })
    })
  }
  const { mutate } = useTranslateText({
    onSuccess(data) {
      updateMessage(data.data)
    },
  })
  const form = useForm<z.infer<typeof TranslateTextValidation.POST>>({
    resolver: zodResolver(TranslateTextValidation.POST),
    defaultValues: {
      from: 'ko',
      to: 'en',
    },
  })
  const onSubmit = async (textFormValue: Validation<'POST'>) => {
    form.setValue('text', '')
    mutate(textFormValue)
    updateMessage({
      content: textFormValue.text,
      createdAt: new Date() + '',
      updatedAt: new Date() + '',
      id: uuid(),
      language: {
        code: 'ko',
        name: '한국어',
        id: uuid(),
      },
      role: 'user',
    })
  }

  const chatBoxList = useMemo(
    () =>
      historyData?.pages
        .map((history) => history.chats)
        .flat()
        .reverse() || [],
    [historyData?.pages]
  )

  const last = historyData?.pages.findLast((arg) => arg)
  const initialTopMostItemIndex = useMemo(() => {
    let totalCount = 0
    historyData?.pages.forEach((page) => {
      totalCount += page.count
    })
    return totalCount
  }, [historyData?.pages])

  useEffect(() => {
    if (Object.keys(form.formState.errors).length) {
      const b = Object.entries(form.formState.errors)

      toast({
        variant: 'warning',
        description: b[0][1].message,
      })
    }
  }, [form.formState.errors, toast])
  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        key="form"
        className="h-full"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex flex-col h-full">
          <FormField
            name="to"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background rounded-none border-none shadow-sm">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a country"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-44 overflow-y-auto">
                    {countryData?.map((country: any) => (
                      <SelectItem key={country.id} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <ChatTexts
            mref={chatRef}
            data={[...chatBoxList, ...messages]}
            initialTopMostItemIndex={initialTopMostItemIndex}
            firstItemIndex={last!.total - initialTopMostItemIndex}
            startReached={() => fetchNextPage()}
            itemContent={(_, data) => (
              <div key={data.content}>
                <ChatText
                  content={data.content || ''}
                  language={data.language.name || ''}
                  isMe={data.role === 'user'}
                  myIcon={<UserAvatar />}
                  senderIcon={<BotAvatar />}
                />
              </div>
            )}
          />
          <div className="p-2 bottom-2 w-full flex items-center">
            <FormField
              name="text"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative flex items-center flex-1 space-y-0">
                  <FormControl>
                    <Textarea
                      rows={3}
                      disabled={isLoading}
                      {...field}
                      className="pr-16"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    className="absolute right-1 bg-transparent hover:bg-transparent shadow-none text-icon"
                    disabled={isLoading}
                  >
                    <LucideIcons.SendHorizonal />
                  </Button>
                </FormItem>
              )}
            />
            <NavigationPopover
              select={form.getValues()}
              onRecordEnd={(result) => {
                form.setValue('text', result)
              }}
            />
          </div>
        </div>
      </motion.form>
    </Form>
  )
}

export default TextForm
