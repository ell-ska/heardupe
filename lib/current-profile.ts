import { getServerSession } from 'next-auth'

import { db } from '@/lib/db'

const currentProfile = async () => {
  const session = await getServerSession()

  if (!session?.user?.email) return null

  const profile = await db.profile.findUnique({
    where: {
      email: session.user.email,
    },
  })

  return profile
}

export { currentProfile }
