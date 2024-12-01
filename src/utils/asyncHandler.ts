import { Request, Response, NextFunction, RequestHandler } from "express"

const asyncHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next))
      .then((result) => {
        if (typeof result !== "undefined") {
          res.send(result)
        } else {
          next()
        }
      })
      .catch((err) => next(err))
  }
}

export { asyncHandler }
