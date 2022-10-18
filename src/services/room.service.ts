import QueryString from "qs"
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

const verifyRoomInUser = async(userId : string, roomQuery:QueryString.ParsedQs)=>{
  const room = await RoomsModel.findOne(roomQuery)
  const isIncluded = room?.users?.includes(userId)
  return isIncluded
}

const accessRoomService = async(roomId : string ,email:string)=>{
  const room = await RoomsModel.findById(roomId)
  if (room ===null) throw new Error('Room not founded')
  const userContact = await UserModel.findOne({email})
  if (userContact ===null) throw new Error('User not founded')
  if (room.users?.includes(userContact.id)) return
  room?.users?.push(userContact?.id)
  await room?.save()
}
export {createRoomService, getRoomByName, verifyRoomInUser, accessRoomService}