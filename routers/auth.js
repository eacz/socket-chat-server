// path: /api/login

const { Router } = require('express')
const router = Router()
const { createUser, login, renewToken } = require('../controllers/auth')

router.post('/new', createUser)

router.post('/', login)

router.get('/renew', renewToken)

module.exports = router;