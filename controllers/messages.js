const Message = require('../models/message')

const getChat = async (req, res) => {
  const userId = req.userId
  const from = req.params.from
  try {
    const last30messages = await Message.find({
      $or: [
        { from: userId, to: from },
        { from: from, to: userId },
      ],
    })
      .sort({ createdAt: 'desc' })
      .limit(30)

    res.json({
      ok: true,
      messages: last30messages,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ok: false, msg: 'Something went wrong. Probably invalid mongoId.'})
  }
}

module.exports = {
  getChat,
}
