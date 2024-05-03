import { auth } from '@/auth'
import { db } from '@/lib/db'

export const currentProfile = async () => {
  const session = await auth()
  const user = session?.user

  if (!user || !user.email) return null

  const profile = await db.profile.findUnique({
    where: {
      email: user.email,
    },
  })

  return profile
}
