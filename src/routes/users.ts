import { Router } from 'express'
import { addContactCtrl, getUserCtrl } from '../controllers/user.controller'
import verifyAccessToken from '../middlewares/verifyAccessToken'

const router = Router()

router.use(verifyAccessToken)
router.get('/', getUserCtrl)
router.post('/addContact',addContactCtrl )

export { router }
