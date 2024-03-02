import { DEFAULT_SERVER_ERROR, createSafeActionClient } from 'next-safe-action'

const handleReturnedServerError = (error: Error) => {
  if (error.message) return error.message
  return DEFAULT_SERVER_ERROR
}

export const action = createSafeActionClient({ handleReturnedServerError })
