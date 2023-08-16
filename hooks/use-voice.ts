import { Recorder } from '@/lib/Recorder'
import { useCallback, useEffect, useRef, useState } from 'react'

const useVoice = () => {
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<Recorder>(Recorder.getInstance()).current

  const updateState = useCallback((state: boolean) => {
    setIsRecording(state)
  }, [])

  useEffect(() => {
    recorder.addListner(updateState)
    return () => {
      recorder.clearListner()
    }
  }, [recorder, updateState])
  return { recorder, isRecording }
}

export default useVoice
