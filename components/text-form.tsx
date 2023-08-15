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
      toast({
        variant: 'warning',
        description: 'required',
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
        <div className="grid grid-cols-2 gap-4 px-2">
          <FormField
            name="to"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>to</FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a country"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-44 overflow-y-auto">
                    {countryData?.data.map((country: any) => (
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
        </div>
        <div className="flex flex-col h-full">
          <ChatTexts
            mref={chatRef}
            data={[...chatBoxList, ...messages]}
            initialTopMostItemIndex={initialTopMostItemIndex}
            firstItemIndex={last!.total - initialTopMostItemIndex}
            startReached={() => fetchNextPage()}
            itemContent={(_, data) => (
              <div key={data.content}>
                <ChatText
                  role={data.role || ''}
                  content={data.content || ''}
                  language={data.language.name || ''}
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
                    className="absolute right-1 bg-transparent hover:bg-transparent shadow-none"
                    disabled={isLoading}
                  >
                    <LucideIcons.SendHorizonal className="text-white" />
                  </Button>
                </FormItem>
              )}
            />
            <NavigationPopover select={form.getValues()} />
          </div>
        </div>
      </motion.form>
    </Form>
  )
}

export default TextForm
