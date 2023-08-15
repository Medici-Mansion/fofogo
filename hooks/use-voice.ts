import { Recorder } from '@/lib/Recorder'
import { useRef } from 'react'

const useVoice = () => {
  const recorder = useRef(Recorder.getInstance()).current
  return recorder
}

export default useVoice
