import { Recorder } from '@/lib/Recorder'
import { useRef } from 'react'

const useVoice = () => {
  const recorder = useRef(new Recorder()).current
  return recorder
}

export default useVoice
