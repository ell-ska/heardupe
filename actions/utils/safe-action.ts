import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action'

const handleReturnedServerError = (error: Error) => {
  if (error.message) return error.message
  return DEFAULT_SERVER_ERROR_MESSAGE
}

export const action = createSafeActionClient({ handleReturnedServerError })
