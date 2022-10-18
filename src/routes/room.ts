import {Router} from 'express'
import { body } from 'express-validator'
import { createRoomCtrl, verifyRoomCtrl } from '../controllers/room.controller'
import verifyAccessToken from '../middlewares/verifyAccessToken'

const router = Router()

/**
 *  * http://localhost:3500/room/ [POST]
 */
router.use(verifyAccessToken)
router.post('/create',body('name').exists().isAlphanumeric(), createRoomCtrl)
router.get('/verify', verifyRoomCtrl)
export {router}