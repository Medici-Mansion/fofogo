'use client'

import { useEffect, useState, useRef } from 'react'
import ChatText from './chat-text'

const ChatTexts = ({ historyData }: any) => {
  return (
    <div className="h-full overflow-y-auto pt-2 border m-2">
      {historyData.data.map((text: any) => {
        return (
          <div key={text.id}>
            <ChatText
              role={text.role || ''}
              content={text.content || ''}
              createdAt={text.createdAt || ''}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ChatTexts
