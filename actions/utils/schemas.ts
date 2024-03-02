import { z } from 'zod'

export const becomeBetaUserSchema = z.object({
  name: z.string().min(1, 'Enter your name'),
  email: z.string().email("That's not a valid email"),
})
