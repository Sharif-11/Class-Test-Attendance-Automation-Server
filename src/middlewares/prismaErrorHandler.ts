import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ErrorMessage } from '../Interfaces/responses.interfaces'

export const knownRequestHandler = (error: PrismaClientKnownRequestError) => {
  const { code, meta } = error
  console.log({ code, meta })
  if (code === 'P2002') {
    const result: ErrorMessage = {
      path: String(meta?.modelName),
      message: `${meta?.target} must be unique`,
    }
    return result
  } else if (error.code === 'P2003') {
    if (error.message.includes('`prisma.course.delete()` invocation')) {
      const result: ErrorMessage = {
        path: meta?.modelName as string,
        message: 'Delete failed',
      }
      return result
    }
  } else if (error.code === 'P2025') {
    const result: ErrorMessage = {
      path: '',
      message: (meta?.cause as string) || 'Record not found!',
    }
    return result
  }

  return { path: '', message: '' }
}
