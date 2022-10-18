import { NextFunction, Request, Response } from 'express'

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message)
  res.status(500).send({ error: err.message })
}

export { errorHandler }
