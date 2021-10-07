const User = require('../models/user');

const userConnectionChange = async (id, onlineStatus) => {
  const user = await User.findById(id)
  user.online = onlineStatus;
  await user.save()
  return user;
}

module.exports = {
  userConnectionChange
}