import UserModel from "../models/User";

const logoutService =async (refreshToken:string)=>{
  await UserModel.findOneAndUpdate({refreshToken}, {refreshToken:''},{new : true})
}

export {logoutService}