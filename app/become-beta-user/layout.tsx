import { HeardupeXSpotify } from '@/components/HeardupeXSpotify'

export default function BecomeBetaUserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='main relative flex grow flex-col items-center justify-center space-y-12'>
      {children}
      <HeardupeXSpotify size='sm' className='absolute bottom-6' />
    </main>
  )
}
