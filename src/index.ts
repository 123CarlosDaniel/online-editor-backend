import app from './app'
import { Server as SocketServer } from 'socket.io'
import { Room } from './interfaces/room.interface'

const port = app.get('port')
console.log('Server running on port', port)
const server = app.listen(port)

const io = new SocketServer(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
})

// var rooms: Room[] = []
var rooms = new Map<string,Room>()

const createRoom =(name:string) : Room=> ({
  users: ['pepe1', 'pepe2', 'pepe3'],
  code: {
    Javascript: 'let language = "javascript"',
    Html: '<h1>Hola mundo</h1>',
    Css: 'h1{color:red;}',
  },
  name,
  owner : 'me'
})

// rooms.set('room1', createRoom('room1'))

enum languages {
  Javascript = 'Javascript',
  Html = 'Html',
  Css = 'Css',
}

io.on('connection', (socket) => {


  const counter = io.engine.clientsCount
  console.log({ counter }, 'conectado')

  socket.on('join_room', async(roomName,cbIsConnected) => {
    let code = rooms.get(roomName)?.code
    if (code === undefined) {
      rooms.set(roomName,createRoom(roomName))
      code = rooms.get(roomName)!.code
    }
    socket.join(roomName)
    cbIsConnected(true)
   
    socket.on('init', (language: languages) => {
      socket.emit('initCode' + language, code![language])
    })
  
    socket.on(
      'clientInsert',
      (index: number, text: string, language: languages) => {
        let dataCode = code![language]
        dataCode = dataCode.slice(0, index) + text + dataCode.slice(index)
        code![language] = dataCode
        socket.to(roomName).emit('serverAction' + language, 'insert', index, text)
      }
    )
  
    socket.on(
      'clientDelete',
      (index: number, length: number, language: languages) => {
        let dataCode = code![language]
        dataCode = dataCode.slice(0, index) + dataCode.slice(index + length)
        code![language] = dataCode
        socket.to(roomName).emit('serverAction' + language, 'delete', index, length)
      }
    )
  
    socket.on(
      'clientReplace',
      (index: number, length: number, text: string, language: languages) => {
        let dataCode = code![language]
        dataCode =
          dataCode.slice(0, index) + text + dataCode.slice(index + length)
        code![language] = dataCode
        socket.to(roomName).emit(
          'serverAction' + language,
          'replace',
          index,
          length,
          text
        )
      }
    )
  })
  
  socket.on('exit', () => {
    socket.disconnect(true)
  })


  socket.on('disconnect', () => {
    const counter = io.engine.clientsCount
    console.log({ counter }, 'exit')
  })
})
