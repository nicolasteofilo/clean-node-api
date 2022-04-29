import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    }
    const { body, statusCode } = await controller.handle(httpRequest)

    if (statusCode === 200 || statusCode === 201) {
      return res.status(statusCode).json(body)
    } else {
      return res.status(statusCode).json({
        error: body.message,
      })
    }
  }
}
