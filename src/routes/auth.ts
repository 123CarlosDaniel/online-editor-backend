import { Router } from 'express'
import { loginCtrl, registerCtrl } from '../controllers/auth.controller'
import { body } from 'express-validator'
const router = Router()
/**
 *  *http://localhost:3500/api/auth/ [POST]
 */

router.post(
  '/login',
  body('email').exists().isEmail(),
  body('password').isLength({ min: 6 }),
  loginCtrl
)
router.post(
  '/register',
  body('userName').exists(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  registerCtrl
)

export { router }
