import React from 'react'
import * as LucideIcons from 'lucide-react'

const SpeechPage = () => {
  return (
    <div className="flex flex-col items-center h-full justify-between p-3">
      <LucideIcons.Mic className="rotate-180 w-20 h-16 text-[#68cede]" />
      <LucideIcons.Mic className="w-20 h-16 text-[#68cede]" />
    </div>
  )
}

export default SpeechPage
