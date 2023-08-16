'use client'
import useVoice from '@/hooks/use-voice'
import { Recorder } from '@/lib/Recorder'
import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'
import { ScaleLoader } from 'react-spinners'
import { LoaderHeightWidthRadiusProps } from 'react-spinners/helpers/props'
interface MicRecorderProps {
  className?: string
  onStartRecording?: (starter: Recorder['start']) => void
  loader?: LoaderHeightWidthRadiusProps
}

const MicRecorder = ({
  className,
  onStartRecording,
  loader,
}: MicRecorderProps) => {
  const { isRecording, recorder } = useVoice()
  return (
    <div className={cn('flex justify-center items-center', className)}>
      {isRecording ? (
        <ScaleLoader
          className="w-full h-full justify-center items-center"
          color="#75efff"
          width={2}
          height={5}
          loading
          margin={1}
          radius={1}
          speedMultiplier={0.7}
          {...loader}
        />
      ) : (
        <LucideIcons.Mic
          className="w-full h-full"
          onClick={() => onStartRecording && onStartRecording(recorder.start)}
        />
      )}
    </div>
  )

  // (
  // <LucideIcons.Mic
  //   className={cn(' w-20 h-16 text-muted mx-auto', className)}
  // />
  // )
}

export default MicRecorder
