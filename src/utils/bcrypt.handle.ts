import { hash, compare } from 'bcryptjs'

const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 8)
  return hashedPassword
}

const comparePassword = (password: string, hashedPassword: string) => {
  return compare(password, hashedPassword)
}

export { hashPassword, comparePassword }
