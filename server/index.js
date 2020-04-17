const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const cors = require('cors')
const cp = require('cookie-parser')

const { addUser, removeUser, getUser } = require('./users')
const router = require('./router')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

// handle cors
app.use(cors())
app.use(router)

// handle SameSite cookie error
app.use(cp())

app.get('/set', (req, res) => {
  // Set the new style cookie
  res.cookie('myCookie', 'value', { sameSite: 'none', secure: true })
  // And set the same value in the legacy cookie
  res.cookie('myCookie-legacy', 'value', { secure: true })
  res.end()
})

app.get('/', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  let cookieVal = null

  if (req.cookies['myCookie']) {
    // check the new style cookie first
    cookieVal = req.cookies['myCookie']
  } else if (req.cookies['myCookie-legacy']) {
    // otherwise fall back to the legacy cookie
    cookieVal = req.cookies['myCookie-legacy']
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
