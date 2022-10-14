import { Router } from 'express'
import { readdirSync } from 'fs'

const PATH_ROUTER = __dirname
const router = Router()

const cleanFileName = (filename: string) => {
  return filename.split('.')[0]
}

readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleanFileName(filename)
  if (cleanName !== 'index') {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router)
    })
  }
})

export { router }
