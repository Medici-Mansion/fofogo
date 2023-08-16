
import { useRef } from 'react'

const useDebounceFn = (delay?: number) => {
  const timer = useRef<NodeJS.Timer>()

  const derrivedDeboundFn = (callback: any) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    const newTimer = setTimeout(() => callback()(), delay || 1000)
    timer.current = newTimer
  }
  return derrivedDeboundFn

}

export default useDebounceFn