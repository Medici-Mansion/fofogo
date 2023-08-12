'use client'

import { useEffect, useState, useRef } from 'react'
import ChatText from './chat-text'

const ChatTexts = () => {
  return (
    <div className="px-2 h-full overflow-y-auto pt-2">
      <ChatText />
    </div>
  )
}

export default ChatTexts
