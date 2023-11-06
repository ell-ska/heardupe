import { getServerSession } from 'next-auth'

import { db } from '@/lib/db'
import {
  AuthUser,
  authOptions,
} from '@/app/api/auth/[...nextauth]/auth-options'

const currentProfile = async () => {
  const session = await getServerSession(authOptions)
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
