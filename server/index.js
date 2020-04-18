const fs = require('fs')

const options = {
  key: fs.readFileSync('/etc/ssl/private/key.pem'),
  cert: fs.readFileSync('/etc/ssl/private/cert.pem')
}

const app = require('express')()
const server = require('https').Server(options, app)
const allowedOrigins = '*:*'

const io = require('socket.io')(server, { origins: allowedOrigins, wsEngine: 'ws' })

// const cors = require('cors')

const PORT = 4000
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

app.get('/socket', (req, res) => {
  res.send('server is running')
})

const { addUser, removeUser, getUser } = require('./users')
// const router = require('./router')
// const path = require('path')

// handle cors
// app.use(cors())
// app.use(router)

// app.use(express.static(path.join(__dirname, '../client/build')))
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
// })

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
// })

// app.listen(3000)

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
