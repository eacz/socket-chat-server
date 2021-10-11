const { userConnectionChange, getUsers } = require("../controllers/sockets");
const { checkJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents() {
    this.io.on('connection', async (socket) => {
      const [ok, id] = checkJWT(socket.handshake.query['token-sk'])

      if(!ok) {
        console.log('unidentified socket');
        return socket.disconnect()
      }

      await userConnectionChange(id, true)
      //TODO validate JWT
      //If the isn't valid, disconnect socket

      //TODO know what user is active through ID
      
      //TODO emit all connected users
      this.io.emit('users-list', await getUsers() )
      //TODO socket join, userId

      //TODO listen client messages
      //personal-message

      //TODO disconnect, set user as offline
      socket.on('disconnect', async () => {
        await userConnectionChange(id, false)
      })
    })
  }
}

module.exports = Sockets
