import Image from 'next/image'

import { cn } from '@/utils/classnames'
import spotifyLogo from '@/public/spotify-logo.svg'

type HeardupeXSpotifyProps = {
  size?: 'base' | 'sm'
  className?: string
}

const HeardupeXSpotify = ({
  size = 'base',
  className,
}: HeardupeXSpotifyProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 font-branding md:flex-row md:gap-8',
        size === 'sm' && 'flex-row md:gap-4',
        className,
      )}
    >
      <h2
        className={cn(
          'text-4xl md:text-5xl',
          size === 'sm' && 'text-2xl md:text-2xl',
        )}
      >
        Heardupe
      </h2>
      <span
        className={cn(
          'text-2xl md:text-3xl',
          size === 'sm' && 'text-sm md:text-sm',
        )}
      >
        x
      </span>
      <Image
        src={spotifyLogo}
        alt='Spotify Logo'
        className={cn(
          'size-12 md:size-16',
          size === 'sm' && 'size-8 md:size-8',
        )}
      />
    </div>
  )
}

export default HeardupeXSpotify
