const Loader = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2'
        stroke='#1ED760'
        strokeWidth='4'
      />
    </svg>
  )
}

const Pause = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='24' cy='24' r='24' fill='white' />
      <path
        d='M20 32V16C20 14.8954 19.1046 14 18 14C16.8954 14 16 14.8954 16 16V32C16 33.1046 16.8954 34 18 34C19.1046 34 20 33.1046 20 32Z'
        fill='#181818'
      />
      <path
        d='M32 32V16C32 14.8954 31.1046 14 30 14C28.8954 14 28 14.8954 28 16V32C28 33.1046 28.8954 34 30 34C31.1046 34 32 33.1046 32 32Z'
        fill='#181818'
      />
    </svg>
  )
}

const Play = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='24' cy='24' r='24' fill='white' />
      <path
        d='M18 32.759V15.241C18 14.4692 18.8372 13.9884 19.5039 14.3773L34.5192 23.1362C35.1807 23.5221 35.1807 24.4779 34.5192 24.8638L19.5039 33.6227C18.8372 34.0116 18 33.5308 18 32.759Z'
        fill='#181818'
        stroke='#181818'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

const PlayBg = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='24' cy='24' r='24' fill='#1ED760' />
      <path
        d='M18 32.759V15.241C18 14.4692 18.8372 13.9884 19.5039 14.3773L34.5192 23.1362C35.1807 23.5221 35.1807 24.4779 34.5192 24.8638L19.5039 33.6227C18.8372 34.0116 18 33.5308 18 32.759Z'
        fill='#181818'
        stroke='#181818'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export { Loader, Pause, Play, PlayBg }
