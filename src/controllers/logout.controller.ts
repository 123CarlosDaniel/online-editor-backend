import { Request, Response } from 'express'
import { logoutService } from '../services/logout.service'

const logoutCtrl = async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies.jwt)
    return res.status(200).send({ message: 'Token not provided' })
  try {
    const refreshToken = cookies.jwt
    await logoutService(refreshToken)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'lax', secure: false })
    res.sendStatus(202)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send({ error: error.message })
  }
}

export { logoutCtrl }
