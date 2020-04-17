const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.cookie('same-site-cookie', 'foo', { sameSite: 'lax' })
  res.send('server is up and running')
})

module.exports = router
