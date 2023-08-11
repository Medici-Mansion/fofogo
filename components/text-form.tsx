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
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import * as LucideIcons from 'lucide-react'
import ChatTexts from './chat-texts'

const formSchema = z.object({
  userText: z.string().min(1, {
    message: '텍스트를 입력해주세요!',
  }),
  userLanguage: z.string().min(1, {
    message: 'ㅎㅎ',
  }),
  changelanguage: z.string().min(1, {
    message: 'ㅎㅎ1',
  }),
})

const value: any = [
  {
    id: 1,
    con: '1',
  },
  {
    id: 2,
    con: '2',
  },
  {
    id: 3,
    con: '3',
  },
  {
    id: 4,
    con: '4',
  },
]

const TextForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userLanguage: '',
      changelanguage: '',
      userText: '',
    },
  })

  const onSubmit = async () => {
    console.log('submit!')
  }

  return (
    <div className="pt-16 w-full mt-2 h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <div className="grid grid-cols-2 gap-4 px-2">
            <FormField
              name="userLanguage"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
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
                    <SelectContent>
                      {value.map((country: any) => (
                        <SelectItem key={country.id} value={country.con}>
                          {country.con}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="changelanguage"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
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
                    <SelectContent>
                      {value.map((country: any) => (
                        <SelectItem key={country.id} value={country.con}>
                          {country.con}
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
            <ChatTexts />
            <div className="p-2 bottom-2 w-full">
              <FormField
                name="userText"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        rows={4}
                        disabled={isLoading}
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default TextForm
