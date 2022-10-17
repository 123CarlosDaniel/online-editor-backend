import UserModel from '../models/User'

const getUserService = async (id: string) => {
  const user = await UserModel.findById(id)
  return user
}

export { getUserService }
