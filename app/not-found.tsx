import Link from 'next/link'
import Image from 'next/image'

import { buttonVariants } from '@/components/Button'
import notFoundImage from '@/public/404.svg'

const NotFound = () => {
  return (
    <main className='main flex grow flex-col items-center justify-center'>
      <Image src={notFoundImage} alt='' className='mb-6' />
      <h2 className='mb-3 text-xl'>It looks like you got lost in the music!</h2>
      <h3 className='mb-12 text-neutral-300'>
        No, I&apos;m serious. This page doesn&apos;t exist.
      </h3>
      <Link href='/' className={buttonVariants()}>
        Get yourself home
      </Link>
    </main>
  )
}

export default NotFound
