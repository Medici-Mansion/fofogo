import { Recorder } from '@/lib/Recorder'
import { useRef } from 'react'

const useVoice = () => {
  const recorder = useRef(new Recorder())
  return recorder.current
}

export default useVoice
