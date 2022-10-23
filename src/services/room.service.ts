import QueryString from "qs"
import RoomsModel from "../models/Room"
import UserModel from "../models/User"
import { Code } from "../interfaces/room.interface"

interface RoomParamsInterface {
  userId : string
  name : string
}

const createRoomService = async ({userId,name}: RoomParamsInterface)=>{
  const roomFounded = await RoomsModel.findOne({name})
  if (roomFounded !== null) throw new Error('Room name already used')

  const room = await RoomsModel.create({
    name,
    owner : userId,
    users : [userId]
  })

  UserModel.findById(userId)
  .then(user => {
    if (user === null) throw new Error('User not found')
    user.rooms?.push({
      id : room.id,
      name : name
    })
    return user.save()
  }).then()
  return room
}

const getRoomByName = async (name:string)=>{
  const roomFounded = await RoomsModel.findOne({name})
  return roomFounded
}

const verifyRoomInUser = async(userId : string, roomQuery:QueryString.ParsedQs)=>{
  let room
  if (roomQuery.id) {
    room = await RoomsModel.findById(roomQuery.id)
  } else {
    room = await RoomsModel.findOne({name : roomQuery.name})
  }
  if (room ===null) throw new Error('Room not found')
  const isIncluded = room?.users?.includes(userId)
  return isIncluded
}

const accessRoomService = async(roomId : string ,email:string)=>{
  const room = await RoomsModel.findById(roomId)
  if (room ===null) throw new Error('Room not found')
  const userContact = await UserModel.findOne({email})
  if (userContact ===null) throw new Error('User not found')
  if (room.users?.includes(userContact.id)) return
  room.users?.push(userContact?.id)
  userContact.rooms?.push({
    id : roomId,
    name : room.name
  })
  await Promise.all([room.save(),userContact.save()])
}

const saveRoomCodeService = async(roomName : string, code : Code ) =>{
  await RoomsModel.findOneAndUpdate({name : roomName}, {code})
}
export {createRoomService, getRoomByName, verifyRoomInUser, accessRoomService, saveRoomCodeService}