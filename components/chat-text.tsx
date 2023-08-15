import { cn } from '@/lib/utils'
import UserAvatar from './user-avatar'
import BotAvatar from './bot-avatar'
import { Button } from '@/components/ui/button'
import { useToast } from './ui/use-toast'
import * as LucideIcons from 'lucide-react'
import { motion } from 'framer-motion'
import { Message } from '@/APIs/translateApi'
import { ReactNode } from 'react'
type ChatTextDefault = Pick<Message, 'content'> & {
  language: Message['language']['name']
}

type ChatTextProps = ChatTextDefault & {
  isMe: boolean
  senderIcon: ReactNode
  myIcon: ReactNode
}

const ChatText = ({
  content,
  language,
  isMe,
  myIcon,
  senderIcon,
}: ChatTextProps) => {
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
    <motion.div
      className={cn(
        'flex items-start gap-x-1 py-4 w-full relative',
        isMe ? 'pr-2 pl-10 flex-row-reverse' : 'pr-10 pl-2'
      )}
    >
      {isMe ? myIcon : senderIcon}
      <div>
        <motion.div
          initial={{
            x: isMe ? 10 : -10,
            scaleY: 0.2,
            scaleX: 0.1,
          }}
          animate={{
            x: 0,
            scaleY: 1,
            scaleX: 1,
          }}
          transition={{
            type: 'tween',
            duration: 0.1,
          }}
          className={cn(
            'rounded-md px-4 py-2 m-2 max-x-sm text-sm bg-primary/10 relative group',
            isMe ? 'origin-right' : 'origin-left'
          )}
        >
          {content}
          {isMe && (
            <Button
              onClick={(e) => {
                onCopy(e)
              }}
              className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity -right-14 top-0"
            >
              <LucideIcons.Copy className="w-4 h-4" />
            </Button>
          )}
        </motion.div>
        <p
          className={cn(
            'text-[8px]',
            isMe ? 'flex justify-end mr-3' : 'flex justify-start ml-3'
          )}
        >
          {language}
        </p>
      </div>
    </motion.div>
  )
}

export default ChatText
