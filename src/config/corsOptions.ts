import { CorsOptions } from 'cors'
import { allowedOrigins } from './allowedOrigins'

const corsOption: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Origin not allowed'))
    }
  },
  optionsSuccessStatus: 200,
}

export default corsOption
