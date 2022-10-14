import { Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/auth.service";
import { hashPassword } from "../utils/bcrypt.handle";
import { handleHttp } from "../utils/error.handle";
import { validationResult } from "express-validator";

const registerCtrl = async (req:Request, res:Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()})
    }
    let {userName, email, password} = req.body
    password =await hashPassword(password)
    const {accessToken,refreshToken,userCreated} = await registerUserService({userName,email,password})
    res.cookie('jwt',refreshToken,{ httpOnly:true,sameSite:'lax',secure:false,maxAge:1000 * 60 * 60 * 24 * 7})
    res.status(201).send({user:userCreated,token: accessToken})

  } catch (error: any) {
    handleHttp(res,error.message || "ERROR_REGISTER")
  }
}

const loginCtrl = async (req:Request, res:Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }
    const {userFounded,accessToken,refreshToken} = await loginUserService(req.body)
    res.cookie('jwt',refreshToken, {httpOnly:true,sameSite:'lax', secure:false,maxAge:1000*60*60*24*7})
    res.status(202).send({user:userFounded,token:accessToken})
  } catch (error:any) {
    handleHttp(res,error.message || "ERROR_LOGIN")
  }
}
export {registerCtrl, loginCtrl}