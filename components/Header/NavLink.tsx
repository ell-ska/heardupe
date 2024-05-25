'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

type NavLinkProps = {
  name: string
  path: string
}

export const NavLink = ({ name, path }: NavLinkProps) => {
  const currentPath = usePathname()
  const isActive = currentPath === path

  return (
    <Link href={path} className='relative transition hover:scale-105'>
      {name}
      {isActive && (
        <motion.div
          layoutId='active'
          className='absolute -inset-x-4 -inset-y-2 -z-10 rounded-full bg-neutral-600'
        />
      )}
    </Link>
  )
}
