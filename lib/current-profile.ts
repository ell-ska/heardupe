import { auth } from '@/auth'
import { ExtendedUser } from '@/types'
import { db } from '@/lib/db'

const currentProfile = async () => {
  const session = await auth()
  const user = session?.user as ExtendedUser

  if (!user || !user.email) return null

  const profile = await db.profile.findUnique({
    where: {
      email: user.email,
    },
  })

  return profile
}

export { currentProfile }
