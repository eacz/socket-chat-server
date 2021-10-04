class Sockets {
  constructor(io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      //TODO validate JWT
      //If the isn't valid, disconnect socket

      //TODO know what user is active through ID
      
      //TODO emit all connected users

      //TODO socket join, userId

      //TODO listen client messages
      //personal-message

      //TODO disconnect, set user as offline
    })
  }
}

module.exports = Sockets
