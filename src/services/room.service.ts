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
    owner : userId,
    users : [userId]
  })

  UserModel.findById(userId)
  .then(user => {
    user?.rooms?.push({
      id : room.id,
      name : name
    })
    return user!.save()
  }).then()
  return room
}

const getRoomByName = async (name:string)=>{
  const roomFounded = await RoomsModel.findOne({name})
  return roomFounded
}

const verifyRoomInUser = async(userId : string, roomName:string)=>{
  const room = await RoomsModel.findOne({name:roomName})
  const isIncluded = room?.users?.includes(userId)
  return isIncluded
}

export {createRoomService, getRoomByName, verifyRoomInUser}