'use client'

import { useEffect, useState, useRef } from 'react'
import ChatText from './chat-text'

const ChatTexts = () => {
  return (
    <div className="h-full overflow-y-auto pt-2 border m-2">
      <ChatText />
    </div>
  )
}

export default ChatTexts
