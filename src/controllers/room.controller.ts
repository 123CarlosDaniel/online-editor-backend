import { Response } from 'express'
import { RequestExt } from '../interfaces/req-ext'
import { handleHttp, validateErrorHandler } from '../utils/error.handle'
import {
  accessRoomService,
  createRoomService,
  verifyRoomInUser,
} from '../services/room.service'

const createRoomCtrl = async (req: RequestExt, res: Response) => {
  try {
    validateErrorHandler(req, res)
    const { name } = req.body
    const userId = req.user?.id
    const room = await createRoomService({ name, userId })
    return res.status(201).send(room)
  } catch (error: any) {
    handleHttp(res, error.message || 'ERROR_CREATING_ROOM')
  }
}

const verifyRoomCtrl = async (req: RequestExt, res: Response) => {
  try {
    const id = req.user?.id
    const roomQuery = req.query
    const isIncluded = await verifyRoomInUser(id, roomQuery)
    return res.send({
      authorized: isIncluded,
    })
  } catch (error: any) {
    handleHttp(res, error.message || 'ERROR_VERIFYING_USER')
  }
}

const giveAccessRoomCtrl = async (req: RequestExt, res: Response) => {
  try {
    validateErrorHandler(req, res)
    const { roomId, email } = req.body
    await accessRoomService(roomId, email)
    res.send({
      added: true,
      error: null,
    })
  } catch (error: any) {
    handleHttp(res, error.message || 'ERROR_GIVING_ACCESS')
  }
}
export { createRoomCtrl, verifyRoomCtrl, giveAccessRoomCtrl }
