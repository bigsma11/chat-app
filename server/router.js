const express = require('express')
const router = express.Router()

router.get('/socket.io', (req, res) => {
  res.send('server is up and running')
})

module.exports = router
