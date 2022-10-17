import { Router } from 'express'
import { getUserCtrl } from '../controllers/user.controller'
import verifyAccessToken from '../middlewares/verifyAccessToken'

const router = Router()

router.use(verifyAccessToken)
router.get('/', getUserCtrl)

export { router }
