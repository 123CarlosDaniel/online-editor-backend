import { RequestExt } from '../interfaces/req-ext'
import { Response } from 'express'
import { addContactService, getUserService } from '../services/user.service'
import { handleHttp, validateErrorHandler } from '../utils/error.handle'

const getUserCtrl = async (req: RequestExt, res: Response) => {
  try {
    const id = req.user?.id
    const user = await getUserService(id)
    res.send(user)
  } catch (error: any) {
    handleHttp(res, error.message || 'ERROR_FINDING_USER')
  }
}

const addContactCtrl = async(req:RequestExt,res:Response)=>{
  try {
    validateErrorHandler(req,res)
    const email = req.body.email
    await addContactService(req.user?.id,email)
    res.send({inserted : true,error : null})
  } catch (error:any) {
    handleHttp(res, error.message || 'ERROR_ADDING_CONTACT')
  }
}
export { getUserCtrl, addContactCtrl }
