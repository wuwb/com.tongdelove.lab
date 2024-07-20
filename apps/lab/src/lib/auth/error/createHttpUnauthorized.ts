import { authErrorCodes } from './authErrorCodes'

export const createHttpUnauthorized = (
  message?: string,
  errorCause?: Error
): HttpUnauthorized => {
  return new Error({
    message,
    code: authErrorCodes.AUTHENTICATION_FAILED,
    cause: errorCause,
  })
}
