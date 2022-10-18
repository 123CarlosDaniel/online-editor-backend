import UserModel from '../models/User'

const getUserService = async (id: string) => {
  const user = await UserModel.findById(id)
  return user
}

const addContactService = async (id:string, email:string)=>{
  const userToInsert = await UserModel.findOne({email})
  if (userToInsert === null) {
    throw new Error("User don't exist")
  }
  const user = await UserModel.findById(id)
  user?.contacts?.push({
    email : userToInsert!.email,
    id : userToInsert!.id,
    name : userToInsert!.userName
  })
  await user?.save()
}
export { getUserService, addContactService }
