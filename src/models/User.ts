import { User } from './../interfaces/user.interface'
import { model, Schema } from 'mongoose'

const UserSchema = new Schema<User>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    refreshToken: {
      type: String,
    },
    contacts: {
      type: Array<{
        id : String,
        name : String,
        email : String
      }>,
      default : []
    },
    rooms : {
      type: Array<{
        id : String,
        name : String
      }>,
      default : []
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const UserModel = model('User', UserSchema)
export default UserModel
