const User = require('../models/user');

const userConnectionChange = async (id, onlineStatus) => {
  const user = await User.findById(id)
  user.online = onlineStatus;
  await user.save()
  return user;
}

const getUsers = async () => {
  const users = await User
    .find()
    .sort('-online')
  return users
}

module.exports = {
  userConnectionChange,
  getUsers
}