const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')

const Sockets = require('./sockets')
const dbConnection = require('../database/config')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    
    //dbConnection()

    this.server = http.createServer(this.app)

    this.io = socketio(this.server, {
      /* configurations */
    })
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')))
    //TODO: CORS


    //api endpoints
    this.app.use('/api/login', require('../routers/auth'))
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
