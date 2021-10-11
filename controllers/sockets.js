const User = require('../models/user');
const Message = require('../models/message');
const message = require('../models/message');

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

const saveMessage = async (payload) => {
  try {
    const message = new Message(payload)
    await message.save()
    return message
  } catch (error) {
    console.log(error);
    return false
  }
}

module.exports = {
  userConnectionChange,
  getUsers,
  saveMessage
}