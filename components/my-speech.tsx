'use client'

import * as LucideIcons from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import useGetCountry from '@/hooks/use-country'

const MySpeech = () => {
  const { data: countryData, isLoading, error } = useGetCountry()

  return (
    <div className="flex flex-col items-center h-[50%] justify-around p-3">
      <Textarea
        className="resize-none"
        rows={16}
        readOnly
        value={'klawjefklwejflk'}
      />
      <div className="flex">
        <LucideIcons.Mic className="w-20 h-16 text-[#68cede]" />
        <Select disabled={isLoading}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent className="max-h-44 overflow-y-auto">
            {countryData?.data.map((country: any) => (
              <SelectItem key={country.id} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default MySpeech
