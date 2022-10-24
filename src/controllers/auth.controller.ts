import { Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/auth.service";
import { hashPassword } from "../utils/bcrypt.handle";
import { handleHttp, validateErrorHandler } from "../utils/error.handle";

const registerCtrl = async (req:Request, res:Response) => {
  try {
    validateErrorHandler(req,res)
    let {userName, email, password} = req.body
    password =await hashPassword(password)
    const {accessToken,refreshToken,userCreated} = await registerUserService({userName,email,password})
    res.cookie('jwt',refreshToken,{ httpOnly:true,sameSite:'none',secure:true,maxAge:1000 * 60 * 60 * 24 * 7})
    res.status(201).send({user:userCreated,token: accessToken})

  } catch (error: any) {
    handleHttp(res,error.message || "ERROR_REGISTER")
  }
}

const loginCtrl = async (req:Request, res:Response) => {
  try {
    validateErrorHandler(req,res)
    const {userFounded,accessToken,refreshToken} = await loginUserService(req.body)
    res.cookie('jwt',refreshToken, {httpOnly:true,sameSite:'none', secure:true,maxAge:1000*60*60*24*7})
    res.status(202).send({user:userFounded,token:accessToken})
  } catch (error:any) {
    handleHttp(res,error.message || "ERROR_LOGIN")
  }
}
export {registerCtrl, loginCtrl}