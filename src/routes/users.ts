import { Router } from 'express'
import { body } from 'express-validator'
import { addContactCtrl, getUserCtrl } from '../controllers/user.controller'
import verifyAccessToken from '../middlewares/verifyAccessToken'

const router = Router()

router.use(verifyAccessToken)
router.get('/', getUserCtrl)
router.post('/addContact', body('email').exists().isEmail(), addContactCtrl)

export { router }
