import { cn } from '@/lib/utils'
import UserAvatar from './user-avatar'
import BotAvatar from './bot-avatar'
import { Button } from '@/components/ui/button'
import { useToast } from './ui/use-toast'
import * as LucideIcons from 'lucide-react'

const ChatText = ({ role, content, language, historyLoading }: any) => {
  const { toast } = useToast()
  const onCopy = (event: any) => {
    event.preventDefault()
    if (!content) {
      return
    }

    navigator.clipboard.writeText(content)

    toast({
      variant: 'default',
      description: '복사 됐습니다!',
    })
  }
  return (
    <div
      className={cn(
        'group flex items-start gap-x-1 py-4 w-full',
        role === 'user' && 'justify-end pr-2 pl-10',
        role !== 'user' && 'pr-10 pl-2'
      )}
    >
      {role !== 'user' && <BotAvatar />}
      <div>
        <div className="rounded-md px-4 py-2 m-2 max-x-sm text-sm bg-primary/10">
          {content}
        </div>
        <p
          className={cn(
            'text-[8px]',
            role === 'user' && 'flex justify-end mr-3',
            role !== 'user' && 'flex justify-start ml-3'
          )}
        >
          {language}
        </p>
      </div>
      {role === 'user' && <UserAvatar />}
      {role !== 'user' && !historyLoading && (
        <Button
          onClick={(e) => {
            onCopy(e)
          }}
          className="opacity-0 group-hover:opacity-100 transition mt-2"
        >
          <LucideIcons.Copy className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}

export default ChatText
