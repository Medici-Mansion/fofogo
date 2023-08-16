'use client'

import {
  IndexLocationWithAlign,
  ItemContent,
  Virtuoso,
  VirtuosoHandle,
  VirtuosoProps,
} from 'react-virtuoso'
import { ForwardedRef, Ref, forwardRef, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ChatTextsProps<T, C = any> extends VirtuosoProps<T, C> {
  isLoading?: boolean
  initialTopMostItemIndex?: number | IndexLocationWithAlign
  startReached?: (index: number) => void
  firstItemIndex?: number
  className?: string
}
function ChatTextsInner<T>(
  {
    data,
    className,
    firstItemIndex,
    initialTopMostItemIndex,
    itemContent,
    startReached,
  }: ChatTextsProps<T>,
  ref: ForwardedRef<VirtuosoHandle>
) {
  return (
    <Virtuoso
      ref={ref}
      className={cn('overflow-x-hidden', className)}
      startReached={startReached}
      data={data ?? []}
      initialTopMostItemIndex={initialTopMostItemIndex}
      firstItemIndex={firstItemIndex}
      itemContent={itemContent}
    />
  )
}
interface ChatTextsWithRefProps<T = unknown> extends ChatTextsProps<T> {
  mref?: Ref<VirtuosoHandle>
}

const ChatTextsWithRef = forwardRef(ChatTextsInner)
const ChatTexts = <T,>({ mref, ...props }: ChatTextsWithRefProps<T>) => {
  // @ts-ignore
  return <ChatTextsWithRef {...props} ref={mref} />
}

export default ChatTexts
