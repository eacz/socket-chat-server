const { userConnectionChange, getUsers, saveMessage } = require("../controllers/sockets");
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
      
      this.io.emit('users-list', await getUsers() )
      //socket join
      socket.join(id)

      //listen client messages
      socket.on('personal-message', async (payload) => {
        const message = await saveMessage(payload)
        this.io.to(payload.to).emit('personal-message', message)
        this.io.to(payload.from).emit('personal-message', message)
      })

      //on disconnect, set user as offline
      socket.on('disconnect', async () => {
        await userConnectionChange(id, false)
        this.io.emit('users-list', await getUsers() )
      })
    })
  }
}

module.exports = Sockets
