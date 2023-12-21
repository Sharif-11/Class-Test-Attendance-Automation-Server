class ApiError extends Error {
  status: number
  stack?: string
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
