import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

const handleHttp = (res: Response, error: string) => {
  res.status(400)
  res.send({ error })
}

const validateErrorHandler = (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }
}
export { handleHttp, validateErrorHandler }
