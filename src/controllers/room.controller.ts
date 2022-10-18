import { Response} from 'express'
import { validationResult } from 'express-validator'
import { RequestExt } from '../interfaces/req-ext'
import { accessRoomService, createRoomService, verifyRoomInUser } from '../services/room.service'
import {handleHttp} from '../utils/error.handle'

const createRoomCtrl = async (req : RequestExt,res :Response)=>{
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({error:errors.array()})
    }
    const { name } = req.body
    const userId = req.user?.id
    const room = await createRoomService({name,userId})
    return res.status(201).send(room)
  } catch (error : any) {
    handleHttp(res, error.message || "ERROR_CREATING_ROOM")
  }
}

const verifyRoomCtrl = async (req:RequestExt, res: Response)=>{
  try {
    const id = req.user?.id
    const roomQuery = req.query
    const isIncluded = await verifyRoomInUser(id,roomQuery)
    return res.send({
      authorized : isIncluded
    })
  } catch (error:any) {
    handleHttp(res, error.message || "ERROR_VERIFYING_USER")
  }
}

const accessRoomCtrl = async(req:RequestExt,res:Response)=>{
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({error:errors.array()})
    }
    const {roomId,email} = req.body
    await accessRoomService(roomId ,email)
    res.send({
      added : true,
      error : null
    })
  } catch (error:any) {
    handleHttp(res, error.message || "ERROR_VERIFYING_USER")
  }
}
export {createRoomCtrl, verifyRoomCtrl, accessRoomCtrl}