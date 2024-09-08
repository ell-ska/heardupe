import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action'

export class ActionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ActionError'
  }
}

const handleServerError = (error: Error) => {
  if (error.message) return error.message
  return DEFAULT_SERVER_ERROR_MESSAGE
}

export const action = createSafeActionClient({ handleServerError })
