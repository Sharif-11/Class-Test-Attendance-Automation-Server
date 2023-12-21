import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ErrorMessage } from '../Interfaces/responses.interfaces'

export const knownRequestHandler = (error: PrismaClientKnownRequestError) => {
  const { code, meta } = error
  if (code === 'P2002') {
    const result: ErrorMessage = {
      path: String(meta?.modelName),
      message: `${meta?.target} must be unique`,
    }
    return result
  }
  return { path: '', message: '' }
}
