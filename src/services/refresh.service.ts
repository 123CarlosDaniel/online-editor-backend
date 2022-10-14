import UserModel from "../models/User"


const refreshService =async (refreshToken:string)=>{
  const user = await UserModel.findOne({refreshToken})
  return user
}

export {refreshService}