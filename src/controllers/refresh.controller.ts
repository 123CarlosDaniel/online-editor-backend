import { JwtPayload } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { refreshService } from '../services/refresh.service'
import { generateAccessToken, verifyRefresh } from '../utils/jwt.handle'

export const handleRefreshToken = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies
    if (!cookies.jwt) return res.status(401).send({ error: 'No refresh token' })
    const refreshToken = cookies.jwt
    const user = await refreshService(refreshToken)
    if (!user) return res.status(403).send({ error: 'No user founded' })
    const userFounded = verifyRefresh(refreshToken) as JwtPayload
    if (userFounded.id !== user.id) {
      return res.status(403).send({ error: 'Invalid refresh token' })
    }
    const accessToken = generateAccessToken(user.id)
    res.send({ token: accessToken })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send({ error: error.message })
  }
}
