// import { getServerSession } from 'next-auth'

// import { db } from '@/lib/db'
// import {
//   AuthUser,
//   authOptions,
// } from '@/app/api/auth/[...nextauth]/auth-options'

// const initialProfile = async () => {
//   const session = await getServerSession(authOptions)
//   const user = session?.user as AuthUser

//   if (!user) return null

//   const profile = await db.profile.findUnique({
//     where: {
//       id: user.id,
//     },
//   })

//   if (profile) return profile

//   const newProfile = await db.profile.create({
//     data: {
//       id: user.id,
//       email: user.email,
//     },
//   })

//   return newProfile
// }

// export { initialProfile }
