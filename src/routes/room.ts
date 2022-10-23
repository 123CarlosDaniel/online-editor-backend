import { Router } from 'express'
import { body } from 'express-validator'
import verifyAccessToken from '../middlewares/verifyAccessToken'
import {
  giveAccessRoomCtrl,
  createRoomCtrl,
  verifyRoomCtrl,
} from '../controllers/room.controller'

const router = Router()

/**
 *  * http://localhost:3500/api/room/ [POST]
 */
router.use(verifyAccessToken)
router.post('/create', body('name').exists().isAlphanumeric(), createRoomCtrl)
router.get('/verify', verifyRoomCtrl)
router.post(
  '/access',
  body('email').exists().isEmail(),
  body('roomId').exists(),
  giveAccessRoomCtrl
)
export { router }
