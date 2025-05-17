import { Controller, HTTPRequest } from '../../contracts/controller'
import { Request, Response, NextFunction } from 'express'

export const adaptRoute = (
  controller: Controller
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const httpRequest: HTTPRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        query: req.query as Record<string, string | string[]>,
      }
      const httpResponse = await controller.handle(httpRequest)
      res
        .status(httpResponse.statusCode)
        .json(httpResponse.body)
    } catch (err) {
      next(err)   // Pass the error to the next middleware
    }
  }
}
