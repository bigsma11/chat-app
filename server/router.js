const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.cookie('same-site-cookie', 'foo', { sameSite: 'lax' })
  res.cookie('cross-site-cookie', 'bar', { sameSite: 'none', secure: true })
  res.send('server is up and running')
})

module.exports = router
