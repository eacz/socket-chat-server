// path: /api/messages

const { Router } = require('express');
const { getChat } = require('../controllers/messages');
const verifyJWT = require('../middlewares/verifyJWT');
const router = Router()

router.get('/:from', verifyJWT, getChat)


module.exports = router