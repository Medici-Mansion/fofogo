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
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import * as LucideIcons from 'lucide-react'

const formSchema = z.object({
  text: z.string().min(1, {
    message: '번역할 단어, 문장을 입력해주세요!',
  }),
  country: z.string().min(1, {
    message: '번역할 국가를 선택해주세요!',
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
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      country: '',
    },
  })

  const onSubmit = async () => {
    console.log('submit!')
  }

  return (
    <div className="absolute top-16 w-[100%] mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 px-2">
            <FormField
              name="country"
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
              name="country"
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
          <div className="flex flex-col space-y-3 px-2 mt-3">
            <FormField
              name="text"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="bg-background resize-none"
                      rows={12}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="text"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="bg-background resize-none"
                      rows={12}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className="w-full flex items-center justify-center mt-3">
        <LucideIcons.Circle className="w-12 h-12" />
      </div>
    </div>
  )
}

export default TextForm
