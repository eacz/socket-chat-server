const { checkJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      const token = (socket.handshake.query['token-sk'])
      const [ok, id] = checkJWT(token)

      if(!ok) {
        console.log('unidentified socket');
        return socket.disconnect()
      }
      console.log('Client connected', id);
      //TODO validate JWT
      //If the isn't valid, disconnect socket

      //TODO know what user is active through ID
      
      //TODO emit all connected users

      //TODO socket join, userId

      //TODO listen client messages
      //personal-message

      //TODO disconnect, set user as offline
      socket.on('disconnect', () => {
        console.log('Client disconnected',id);
      })
    })
  }
}

module.exports = Sockets
