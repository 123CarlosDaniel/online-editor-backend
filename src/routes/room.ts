import {Router} from 'express'
import { body } from 'express-validator'
import { accessRoomCtrl, createRoomCtrl, verifyRoomCtrl } from '../controllers/room.controller'
import verifyAccessToken from '../middlewares/verifyAccessToken'

const router = Router()

/**
 *  * http://localhost:3500/room/ [POST]
 */
router.use(verifyAccessToken)
router.post('/create',body('name').exists().isAlphanumeric(), createRoomCtrl)
router.get('/verify', verifyRoomCtrl)
router.post('/access',body('email').exists().isEmail(),body('roomId').exists(), accessRoomCtrl )
export {router}