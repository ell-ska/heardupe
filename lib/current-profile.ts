import { auth } from '@/auth'
import { AuthUser } from '@/types'
import { db } from '@/lib/db'

const currentProfile = async () => {
  const session = await auth()
  const user = session?.user as AuthUser

  if (!user) return null

  const profile = await db.profile.findUnique({
    where: {
      id: user.id,
    },
  })

  return profile
}

export { currentProfile }
