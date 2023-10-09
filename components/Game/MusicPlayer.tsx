'use client'

import { useRef, useState } from 'react'

import { useStatus } from '@/hooks/useGame'
import { Play, Pause } from '@/components/Icons'

const MusicPlayer = () => {
  const { stage, levelOver, currentTrack } = useStatus()

  const seconds = [1, 2, 4, 7, 11, 16]
  const stagePercentages = [6.25, 12.5, 25, 43.75, 68.75, 100]

  const secondsToPlay = (levelOver ? seconds.at(-1) : seconds[stage - 1]) || 16
  const unlockedStagePercentage = levelOver
    ? stagePercentages.at(-1)
    : stagePercentages[stage - 1]

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentDisplayTime, setCurrentDisplayTime] = useState(0)
  const [progressWidth, setProgressWidth] = useState(0)

  const audio = useRef<HTMLAudioElement | null>(null)
  const animation = useRef(0)

  const stopAtCurrentStage = () => {
    audio.current?.pause()
    cancelAnimationFrame(animation.current)
    setIsPlaying(false)

    setProgressWidth(0)
    audio.current ? (audio.current.currentTime = 0) : null
    setCurrentDisplayTime(0)
  }

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes}:${returnedSeconds}`
  }

  const togglePlayPause = () => {
    const wasPlaying = isPlaying
    setIsPlaying(!wasPlaying)

    if (!wasPlaying) {
      audio.current?.play()
      animation.current = requestAnimationFrame(updateProgressBarWhilePlaying)
    } else {
      audio.current?.pause()
      cancelAnimationFrame(animation.current)
    }
  }

  const updateProgressBarWhilePlaying = () => {
    const newWidth = Math.floor(
      ((audio.current ? audio.current.currentTime : 0) * 100) / secondsToPlay,
    )

    setCurrentDisplayTime(audio.current ? audio.current.currentTime : 0)
    setProgressWidth(newWidth)

    if (audio.current && audio.current.currentTime >= secondsToPlay) {
      stopAtCurrentStage()
      return
    }

    animation.current = requestAnimationFrame(updateProgressBarWhilePlaying)
  }

  return (
    <div className='absolute bottom-6 left-1/2 flex w-full max-w-lg -translate-x-1/2 flex-col items-center gap-2'>
      <audio ref={audio} src={currentTrack?.preview_url || undefined}></audio>
      <button className='transition hover:scale-110' onClick={togglePlayPause}>
        {isPlaying ? <Pause /> : <Play />}
      </button>
      {/* progress bar */}
      <div className='flex w-full items-center justify-center gap-4'>
        <div>{calculateTime(currentDisplayTime)}</div>
        <div className='relative h-1 w-full overflow-hidden rounded-full bg-neutral-600'>
          {/* stage lines */}
          <div className='absolute inset-0'>
            {Array.from({ length: 5 }, (_, i) => i + 1).map(index => (
              <div
                key={index}
                className='absolute h-full w-[2px] -translate-x-1/2 bg-white'
                style={{ left: `${stagePercentages[index - 1]}%` }}
              />
            ))}
          </div>
          {/* unlocked listening time */}
          <div
            className='width-[6.25%] absolute h-full overflow-hidden bg-white'
            style={{ width: `${unlockedStagePercentage}%` }}
          >
            {/* current progress */}
            <div
              className='absolute h-full w-0 bg-primary'
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>
        <div>00:16</div>
      </div>
    </div>
  )
}

export default MusicPlayer
