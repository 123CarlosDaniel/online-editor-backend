export interface User {
  rooms? : string[]
  userName: string
  email: string
  password: string
  refreshToken?: string
  contacts?: string[]
}
