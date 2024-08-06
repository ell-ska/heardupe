'use server'

import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { ActionError, action } from '@/actions/utils/safe-action'
import { becomeBetaUserSchema } from '@/actions/utils/schemas'

export const becomeBetaUser = action
  .schema(becomeBetaUserSchema)
  .action(async ({ parsedInput: { email, name } }) => {
    try {
      const existingUser = await db.profile.findUnique({
        where: { email },
      })
      if (existingUser) {
        throw new ActionError(
          'You already have an account! Try logging in instead.',
        )
      }

      const alreadyRequested = await db.betaUserRequest.findUnique({
        where: { email },
      })
      if (alreadyRequested && !alreadyRequested.inDashboard) {
        throw new ActionError('Your request has already been recived!')
      }
      if (alreadyRequested && alreadyRequested.inDashboard) {
        throw new ActionError(
          'Your request has been approved! Try logging in instead.',
        )
      }

      await db.betaUserRequest.create({
        data: { email, name },
      })
    } catch (error) {
      if (error instanceof ActionError) throw error

      console.error('[BECOME_BETA_USER_ACTION_ERROR]', error)
      throw new Error(
        'Something went wrong when signing up for the waitlist, please try again later.',
      )
    }

    redirect('/become-beta-user/submitted')
  })
