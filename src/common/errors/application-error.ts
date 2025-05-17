const APP_ERROR = 'ApplicationError'

export class ApplicationError extends Error {
  message: string
  name: string
  statusCode: number

  constructor(message: string, statusCode?: number, name?: string) {
    super(message)
    this.message = message
    this.statusCode = statusCode || 500
    this.name = name || APP_ERROR
  };
};