import { cn } from '@/lib/utils'
import {} from '@clerk/nextjs'
import UserAvatar from './user-avatar'

const ChatText = ({ role, content, createdAt }: any) => {
  return (
    <div
      className={cn(
        '"group flex items-start gap-x-3 py-4 w-full",',
        role === 'user' && 'justify-end'
      )}
    >
      {content}
      {role === 'user' && <UserAvatar />}
    </div>
  )
}

export default ChatText
