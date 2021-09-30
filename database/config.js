const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.CONN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('DB connected');
  } catch (error) {
    console.log(error)
    throw new Error('DB connection error. check logs.')
  }
}

module.exports = dbConnection