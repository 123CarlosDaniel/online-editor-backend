import { Router } from 'express'
import { RequestExt } from '../interfaces/req-ext'
import verifyAccessToken from '../middlewares/verifyAccessToken'
import UserModel from '../models/User'

const router = Router()

router.use(verifyAccessToken)
router.get('/', async (req: RequestExt, res) => {
  const users = await UserModel.find()
  console.log(req.user)
  res.json({ users })
})

export { router }
