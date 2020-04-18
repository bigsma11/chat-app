const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const cors = require('cors')
const cp = require('cookie-parser')

const { addUser, removeUser, getUser } = require('./users')
const router = require('./router')

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

// handle cors
app.use(cors())
app.use(router)

app.use(cp())

app.get('/set', (req, res) => {
  // Set the new style cookie
  res.cookie('3pcookie', 'value', { sameSite: 'none', secure: true })
  // And set the same value in the legacy cookie
  res.cookie('3pcookie-legacy', 'value', { secure: true })
  res.end()
})

app.get('/', (req, res) => {
  let cookieVal = null

  if (req.cookies['3pcookie']) {
    // check the new style cookie first
    cookieVal = req.cookies['3pcookie']
  } else if (req.cookies['3pcookie-legacy']) {
    // otherwise fall back to the legacy cookie
    cookieVal = req.cookies['3pcookie-legacy']
  }

  res.end()
})

// manage user connect and disconnect
io.on('connection', (socket) => {
  // join
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

  // send message
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', { user: user.name, text: message })

    callback()
  })

  // disconnect
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} had left` })
    }
  })
})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
