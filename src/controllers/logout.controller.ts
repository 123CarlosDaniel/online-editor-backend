import { Request, Response } from 'express'
import { logoutService } from '../services/logout.service'
import { handleHttp } from '../utils/error.handle'

const logoutCtrl = async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies.jwt)
    return res.status(200).send({ message: 'Token not provided' })
  try {
    const refreshToken = cookies.jwt
    await logoutService(refreshToken)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    res.sendStatus(202)
  } catch (error: any) {
    handleHttp(res, error.message || 'ERROR_LOGOUT')
  }
}

export { logoutCtrl }
