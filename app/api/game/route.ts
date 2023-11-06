import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { currentProfile } from '@/lib/current-profile'

const POST = async (req: Request) => {
  try {
    const profile = await currentProfile()
    const { score, id, type } = await req.json()

    if (!profile) {
      new NextResponse('No profile', { status: 401 })
      return redirect('/')
    }

    if (!id || !type) {
      return new NextResponse('Not enough information', { status: 400 })
    }

    await db.game.create({
      data: {
        profileId: profile.id,
        gameId: id,
        type,
      },
    })

    await db.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        totalScore: {
          increment: score,
        },
      },
    })

    return NextResponse.json({ message: 'success' })
  } catch (error) {
    console.log('[GAME_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export { POST }
