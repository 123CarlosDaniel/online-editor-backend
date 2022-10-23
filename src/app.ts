import express from 'express'
import cors from 'cors'
import { router } from './routes'
import morgan from 'morgan'
import dbConnect from './db/mongo'
import { credentials } from './middlewares/credentials'
import corsOption from './config/corsOptions'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error'

const app = express()
app.set('port', process.env.PORT || 3500)
app.use(morgan('dev'))

app.use(credentials)
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())

app.use('/api',router)

app.use(errorHandler)

dbConnect().then()
export default app
