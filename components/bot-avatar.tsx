import { Avatar, AvatarImage } from '@/components/ui/avatar'

const BotAvatar = () => {
  return (
    <Avatar className="h-12 w-12 p-1">
      <AvatarImage src={'/fofogo_symbol.png'} className="w-10 object-contain" />
    </Avatar>
  )
}

export default BotAvatar
