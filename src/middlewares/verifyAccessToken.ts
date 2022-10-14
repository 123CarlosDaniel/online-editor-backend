import { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Response } from 'express'
import { RequestExt } from '../interfaces/req-ext'
import { verifyToken } from '../utils/jwt.handle'

const verifyAccessToken = (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken =
      req.headers.authorization || (req.headers.Authorization as string)
    if (!accessToken) return res.sendStatus(401)
    const token = accessToken.split(' ')[1]
    const user = verifyToken(token) as JwtPayload
    req.user = user
    next()
  } catch (error: any) {
    res.status(400).send({ error: error.message })
  }
}

export default verifyAccessToken
