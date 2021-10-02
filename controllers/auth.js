const User = require('../models/user')
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body

    const emailExists = await User.findOne({ email })
    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: 'The email is already used',
      })
    }

    const usernameExists = await User.findOne({ username })
    if (usernameExists) {
      return res.status(400).json({
        ok: false,
        msg: 'The username is already used',
      })
    }
    const user = new User(req.body)

    //hash password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    res.json({
      ok: true,
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Something went wrong',
    })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  res.json({ ok: true, msg: 'login' })
}

const renewToken = async (req, res) => {
  res.json({ ok: true, msg: 'renew' })
}

module.exports = {
  createUser,
  login,
  renewToken,
}
