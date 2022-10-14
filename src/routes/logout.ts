import { Router } from 'express'
import { logoutCtrl } from '../controllers/logout.controller'

const router = Router()

router.get('/', logoutCtrl)

export { router }
