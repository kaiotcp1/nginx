export type HTTPRequest = {
  body?: any
  params?: any
  query?: any
  headers?: any
}

export type HTTPResponse = {
  statusCode: number
  body: any
}