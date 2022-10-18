import { model, Schema } from 'mongoose'
import { Room } from '../interfaces/room.interface'

const RoomSchema = new Schema<Room>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    users: {
      type: Array<Schema.Types.ObjectId>,
      ref: 'User',
    },
    code: {
      Javascript : {
        type : String,
        default : 'let language = "javascript"'
      },
      Html : {
        type : String,
        default : '<h1>Hola mundo</h1>'
      },
      Css : {
        type : String,
        default : 'h1{color:red;}'
      }
    },
    owner : {
      type : String
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const RoomsModel = model('Room', RoomSchema)
export default RoomsModel
