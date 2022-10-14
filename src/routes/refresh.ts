import { Router } from 'express'
import { handleRefreshToken } from '../controllers/refresh.controller'

const router = Router()

router.get('/', handleRefreshToken)

export { router }
