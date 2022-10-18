interface RoomsI {
  id : string
  name : string
}

interface ContactsI {
  id : string
  name : string
  email : string
}

export interface User {
  rooms? : RoomsI[]
  userName: string
  email: string
  password: string
  refreshToken?: string
  contacts?: ContactsI[]
}
