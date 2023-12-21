import { Response } from 'express'
import { SuccessResponse } from '../Interfaces/responses.interfaces'

export const sendSuccessResponse = <T>(
  res: Response,
  data: SuccessResponse<T>,
): void => {
  const responseData: SuccessResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null || undefined,
  }

  res.status(data.statusCode).json(responseData)
}
