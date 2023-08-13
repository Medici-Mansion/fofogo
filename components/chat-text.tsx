import { cn } from '@/lib/utils'
import {} from '@clerk/nextjs'
import UserAvatar from './user-avatar'
import BotAvatar from './bot-avatar'

const ChatText = ({ role, content, createdAt }: any) => {
  return (
    <div
      className={cn(
        'group flex items-start gap-x-1 py-4 w-full',
        role === 'user' && 'justify-end pr-2 pl-10',
        role !== 'user' && 'pr-10 pl-2'
      )}
    >
      {role !== 'user' && <BotAvatar />}
      <div className="rounded-md px-4 py-2 m-2 max-x-sm text-sm bg-primary/10">
        {content}
      </div>
      {role === 'user' && <UserAvatar />}
    </div>
  )
}

export default ChatText
