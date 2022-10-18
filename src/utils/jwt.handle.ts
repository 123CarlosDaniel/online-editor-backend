import { sign, verify } from 'jsonwebtoken'
import { Types } from 'mongoose'
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET || '123456789'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'gwagwagawgw'

const generateAccessToken = (id: Types.ObjectId) => {
  const jwt = sign({ id }, JWT_SECRET, { expiresIn: '1d' })
  return jwt
}
const generateRefreshToken = (id: Types.ObjectId) => {
  const jwt = sign({ id }, JWT_REFRESH_SECRET, { expiresIn: '30d' })
  return jwt
}

const verifyToken = (jwt: string) => {
  const result = verify(jwt, JWT_SECRET)
  return result
}

const verifyRefresh = (jwt: string) => {
  const result = verify(jwt, JWT_REFRESH_SECRET)
  return result
}

export { generateAccessToken, verifyToken, generateRefreshToken, verifyRefresh }
