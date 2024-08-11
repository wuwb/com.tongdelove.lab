import { authErrorCodes } from './authErrorCodes'

export const createHttpUnauthorized = (
  message?: string,
  errorCause?: Error
) => {
  return new Error({
    message,
    code: authErrorCodes.AUTHENTICATION_FAILED,
    cause: errorCause,
  })
}
