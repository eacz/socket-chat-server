// path: /api/login

const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const { createUser, login, renewToken } = require('../controllers/auth')
const validateFields = require('../middlewares/validateFields')
const verifyJWT = require('../middlewares/verifyJWT')

router.post('/new', [
  check('email', 'The email is required').isEmail(),
  check('password', 'The password must be at least 8 characters').isLength({ min: 8 }),
  check('name', 'The name is required').notEmpty(),
  check('username', 'The username is required').notEmpty(),
  validateFields

], createUser)

router.post(
  '/',
  [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must be at least 8 characters').isLength({ min: 8 }),
    validateFields,
  ],
  login
)

router.get('/renew', [verifyJWT], renewToken)

module.exports = router
