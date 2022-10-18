import UserModel from "../models/User"


const refreshService =async (refreshToken:string)=>{
  const user = await UserModel.findOne({refreshToken})
  if (user === null) throw new Error('User not found')
  return user
}

export {refreshService}