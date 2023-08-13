'use client'

import * as LucideIcons from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

const AudienceSpeech = () => {
  return (
    <div className="flex flex-col items-center h-[50%] justify-between p-3">
      <LucideIcons.Mic className="rotate-180 w-20 h-16 text-[#68cede]" />
      <Textarea
        className="resize-none rotate-180"
        rows={16}
        readOnly
        value={'ksadjflkasdf'}
      />
    </div>
  )
}

export default AudienceSpeech
