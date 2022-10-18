import { Response} from 'express'
import { validationResult } from 'express-validator'
import { RequestExt } from '../interfaces/req-ext'
import { createRoomService, verifyRoomInUser } from '../services/room.service'
import {handleHttp} from '../utils/error.handle'

const createRoomCtrl = async (req : RequestExt,res :Response)=>{
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()})
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
    const roomName = req.body.roomName
    const isIncluded = await verifyRoomInUser(id,roomName)
    return res.send({
      authorized : isIncluded
    })
  } catch (error:any) {
    handleHttp(res, error.message || "ERROR_VERIFYING_USER")
  }
}
export {createRoomCtrl, verifyRoomCtrl}