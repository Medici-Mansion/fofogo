'use client'

import useGetHistoryText from '@/hooks/use-history-text'
import ChatText from './chat-text'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import { useCallback, useMemo, useRef } from 'react'

const ChatTexts = () => {
  const {
    data: historyData,
    error: historyError,
    isLoading: historyLoading,
    key: historyKey,
    refetch: historyRefetch,
    fetchNextPage,
  } = useGetHistoryText()

  const chatBoxList = useMemo(
    () =>
      historyData?.pages
        .map((history) => history.chats)
        .flat()
        .reverse(),
    [historyData?.pages]
  )

  const last = historyData?.pages.findLast((arg) => arg)

  return !historyLoading ? (
    <Virtuoso
      startReached={() => fetchNextPage()}
      data={chatBoxList}
      initialTopMostItemIndex={13}
      firstItemIndex={
        last!.total -
          historyData!.pages.reduce(({ count: aCount }, { count: bCount }) => {
            return { count: aCount + bCount }
          })?.count || 0
      }
      itemContent={(index, data, context) => {
        return (
          <div key={data.id}>
            <ChatText
              role={data.role || ''}
              content={data.content || ''}
              language={data.language.name || ''}
            />
          </div>
        )
      }}
    />
  ) : null
}

export default ChatTexts
