import { Avatar, AvatarImage } from '@/components/ui/avatar'

const BotAvatar = () => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={'/fofogo.png'} className="w-12 h-12" />
    </Avatar>
  )
}

export default BotAvatar
