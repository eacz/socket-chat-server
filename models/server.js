const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const cors = require('cors');

const Sockets = require('./sockets')
const dbConnection = require('../database/config')
const exp = require('constants')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    
    dbConnection()

    this.server = http.createServer(this.app)

    this.io = socketio(this.server, {
      /* configurations */
    })
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')))
    this.app.use(express.json())
    
    this.app.use(cors())


    //api endpoints
    this.app.use('/api/login', require('../routers/auth'))
    this.app.use('/api/messages', require('../routers/messages'))
  }

  configurateSockets() {
    new Sockets(this.io)
  }

  execute() {
    this.middlewares()

    this.configurateSockets()

    this.server.listen(this.port, () => {
      console.log('Server running on:', this.port)
    })
  }
}

module.exports = Server
