import { RequestExt } from '../interfaces/req-ext'
import { Response } from 'express'
import { getUserService } from '../services/user.service'
import { handleHttp } from '../utils/error.handle'

const getUserCtrl = async (req: RequestExt, res: Response) => {
  try {
    const id = req.user?.id
    const user = await getUserService(id)
    res.send(user)
  } catch (error: any) {
    handleHttp(res, error.message || 'ERROR_FINDING_USER')
  }
}

export { getUserCtrl }
