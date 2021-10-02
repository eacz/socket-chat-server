// path: /api/login

const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const { createUser, login, renewToken } = require('../controllers/auth')

router.post('/new', createUser)

router.post('/', 
[
  check('email', 'The email is required').isEmail(),  
  check('password', 'The password must be at least 8 characters').isLength({min: 8}),  
]
,login)

router.get('/renew', renewToken)

module.exports = router;