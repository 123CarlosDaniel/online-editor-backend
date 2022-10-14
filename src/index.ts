import { IRoom } from './types.d'
import app from './app'
import { Server as SocketServer } from 'socket.io'

const port = app.get('port')
console.log('Server running on port', port)
const server = app.listen(port)

const io = new SocketServer(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
})

var rooms: IRoom[] = []

const room = {
  users: ['pepe1', 'pepe2', 'pepe3'],
  code: {
    Javascript: 'let language = "javascript"',
    Html: '<h1>Hola mundo</h1>',
    Css: 'h1{color:red;}',
  },
}

rooms.push(room)

enum languages {
  Javascript = 'Javascript',
  Html = 'Html',
  Css = 'Css',
}

io.on('connection', (socket) => {
  const code = room.code

  const counter = io.engine.clientsCount
  console.log({ counter }, 'gaga1')
  console.log('conectado')

  socket.on('init', (language: languages) => {
    socket.emit('initCode' + language, code[language])
  })

  socket.on('exit', () => {
    socket.disconnect(true)
  })

  socket.on(
    'clientInsert',
    (index: number, text: string, language: languages) => {
      let dataCode = code[language]
      dataCode = dataCode.slice(0, index) + text + dataCode.slice(index)
      code[language] = dataCode
      socket.broadcast.emit('serverAction' + language, 'insert', index, text)
    }
  )

  socket.on(
    'clientDelete',
    (index: number, length: number, language: languages) => {
      let dataCode = code[language]
      dataCode = dataCode.slice(0, index) + dataCode.slice(index + length)
      code[language] = dataCode
      socket.broadcast.emit('serverAction' + language, 'delete', index, length)
    }
  )

  socket.on(
    'clientReplace',
    (index: number, length: number, text: string, language: languages) => {
      let dataCode = code[language]
      dataCode =
        dataCode.slice(0, index) + text + dataCode.slice(index + length)
      code[language] = dataCode
      socket.broadcast.emit(
        'serverAction' + language,
        'replace',
        index,
        length,
        text
      )
    }
  )

  socket.on('disconnect', () => {
    const counter = io.engine.clientsCount
    console.log({ counter }, 'gaga2')
  })
})
