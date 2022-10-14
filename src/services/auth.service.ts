import { User } from "../interfaces/user.interface";
import UserModel from "../models/User";
import { comparePassword } from "../utils/bcrypt.handle";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.handle";


const registerUserService = async(user:User)=>{
  const userCreated = await UserModel.create({...user})
  const accessToken = generateAccessToken(userCreated.id)
  const refreshToken = generateRefreshToken(userCreated.id)
  UserModel.findByIdAndUpdate(userCreated.id,{refreshToken},{new : true}).then()
  return {userCreated,accessToken,refreshToken}
}

const loginUserService = async (user:Omit<User,"userName"| "refreshToken">)=>{
  
  const userFounded =await UserModel.findOne({email:user.email}) 
  if(!userFounded) throw new Error('User not founded')
  const passChecked = await comparePassword(user.password,userFounded.password)
  if (!passChecked) throw new Error('Incorrect data')
  const accessToken = generateAccessToken(userFounded.id)
  const refreshToken = generateRefreshToken(userFounded.id)
  UserModel.findByIdAndUpdate(userFounded.id,{refreshToken},{new : true}).then()
  return { userFounded, accessToken, refreshToken}
}

export { registerUserService, loginUserService}