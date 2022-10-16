import RoomsModel from "../models/Room"
import UserModel from "../models/User"

interface RoomParamsInterface {
  userId : string
  name : string
}

const createRoomService = async ({userId,name}: RoomParamsInterface)=>{
  const roomFounded = await RoomsModel.findOne({name})
  if (roomFounded) throw new Error('Room name already used')

  const room = await RoomsModel.create({
    name,
    owner : userId
  })

  UserModel.findById(userId)
  .then(user => {
    if (user?.rooms?.length ===0) {
      user.rooms = [name]
    } else {
      user!.rooms = [...user!.rooms!, name]
    }
    return user!.save()
  }).then()
  return room
}

const getRoomByName = async (name:string)=>{
  const roomFounded = await RoomsModel.findOne({name})
  return roomFounded
}

export {createRoomService, getRoomByName}