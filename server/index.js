const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')
const router = require('./router')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

// manage user connect and disconnect
io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) {
      return callback(error)
    }

    // show welcome message to the user who had joined
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`
    })

    // let other users known the user had joined
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name}, has joined!` })

    socket.join(user.room)

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', { user: user.name, text: message })

    callback()
  })

  socket.on('disconnect', () => {
    console.log('User had left!!!')
  })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
