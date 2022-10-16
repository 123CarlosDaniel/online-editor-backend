import RoomsModel from "../models/Room"

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
  return {room}
}

const getRoomByName = async (name:string)=>{
  const roomFounded = await RoomsModel.findOne({name})
  return roomFounded
}

export {createRoomService, getRoomByName}