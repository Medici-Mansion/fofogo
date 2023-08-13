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
import { useEffect } from 'react'
import { Validation } from '@/validation/translate/text.validation'
import useTranslateText from '@/hooks/use-translate-text'
import useGetHistoryText from '@/hooks/use-history-text'
import { useQueryClient } from 'react-query'

const TextForm = () => {
  const { toast } = useToast()
  const {
    data: countryData,
    error: countryError,
    isLoading: countryLoading,
  } = useGetCountry()
  const {
    data: historyData,
    error: historyError,
    isLoading: historyLoading,
    key: historyKey,
  } = useGetHistoryText()
  const { mutate } = useTranslateText()
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof TranslateTextValidation.POST>>({
    resolver: zodResolver(TranslateTextValidation.POST),
    defaultValues: {
      from: 'ko',
    },
  })

  const onSubmit = async (textFormValue: Validation<'POST'>) => {
    form.setValue('text', '')
    const newData = queryClient?.getQueryData(historyKey) as { data: [] }
    queryClient.setQueryData(historyKey, {
      ...newData,
      data: [
        ...newData.data,
        {
          content: textFormValue.text,
          language: textFormValue.from,
          role: 'user',
          createdAt: new Date(),
          id: new Date() + '',
        },
      ],
    })

    mutate(textFormValue)
  }

  useEffect(() => {
    if (Object.keys(form.formState.errors).length) {
      toast({
        variant: 'warning',
        description: 'required',
      })
    }
  }, [form.formState.errors, toast])

  return !countryLoading && !historyLoading ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <div className="grid grid-cols-2 gap-4 px-2">
          <FormField
            name="to"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>to</FormLabel>
                <Select
                  disabled={countryLoading}
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
          <ChatTexts historyData={historyData} className="absolute" />
          <div className="p-2 bottom-2 w-full flex items-center">
            <FormField
              name="text"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative flex items-center flex-1 space-y-0">
                  <FormControl>
                    <Textarea
                      rows={3}
                      disabled={countryLoading}
                      {...field}
                      className="pr-16"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    className="absolute right-1 bg-transparent hover:bg-transparent shadow-none"
                    disabled={countryLoading}
                  >
                    <LucideIcons.SendHorizonal className="text-white" />
                  </Button>
                </FormItem>
              )}
            />
            <div className="px-3 pl-5">
              <LucideIcons.CircleEqual className="w-8 h-8 m-auto" />
            </div>
          </div>
        </div>
      </form>
    </Form>
  ) : null
}

export default TextForm
