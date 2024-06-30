'use server'

import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { action } from '@/actions/utils/safe-action'
import { becomeBetaUserSchema as schema } from '@/actions/utils/schemas'

export const becomeBetaUser = action
  .schema(schema)
  .action(async ({ parsedInput: { email, name } }) => {
    const existingUser = await db.profile.findUnique({
      where: { email: email },
    })
    if (existingUser) throw Error('You already have an account!')

    const alreadyRequested = await db.betaUserRequest.findUnique({
      where: { email: email },
    })
    if (alreadyRequested) throw Error('Your request has already been recived!')

    try {
      await db.betaUserRequest.create({
        data: { email, name },
      })
    } catch (error) {
      console.error('[BECOME_BETA_USER_ACTION_ERROR]', error)
      throw Error('Something went wrong when signing up for the waitlist')
    }

    redirect('/become-beta-user/submitted')
  })
