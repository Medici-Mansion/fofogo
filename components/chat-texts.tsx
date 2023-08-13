'use client'

import { useEffect, useState, useRef } from 'react'
import ChatText from './chat-text'
import { ScrollArea } from './ui/scroll-area'

const ChatTexts = ({ historyData }: any) => {
  return (
    // <div className="overflow-y-auto pt-2 border m-2 h-full">
    <ScrollArea>
      {historyData.data.map((text: any) => {
        return (
          <div key={text.id}>
            <ChatText
              role={text.role || ''}
              content={text.content || ''}
              language={text.language.name || ''}
            />
          </div>
        )
      })}
    </ScrollArea>
  )
}

export default ChatTexts
