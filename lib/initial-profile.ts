import { getServerSession } from 'next-auth'

import { db } from '@/lib/db'

const initialProfile = async () => {
  const session = await getServerSession()

  if (!session?.user?.email) return null

  const profile = await db.profile.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (profile) return profile

  const newProfile = await db.profile.create({
    data: {
      email: session.user.email,
    },
  })

  return newProfile
}

export { initialProfile }
