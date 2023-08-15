'use client'

import {
  IndexLocationWithAlign,
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
}
function ChatTextsInner<T>(
  {
    data,
    className,
    firstItemIndex,
    isLoading,
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
type ChatTextsWithRefProps<T> = ChatTextsProps<T> & {
  mref?: Ref<VirtuosoHandle>
}

const ChatTextsWithRef = forwardRef(ChatTextsInner)
export default function ChatTexts<T extends unknown>({
  mref,
  ...props
}: ChatTextsWithRefProps<T>) {
  return <ChatTextsWithRef {...props} ref={mref} />
}
