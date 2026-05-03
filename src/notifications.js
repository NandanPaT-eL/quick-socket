const { getIO } = require('./server')

function notifyUser(userId, event, data) {
  getIO().to(userId).emit(event, data)
}

function broadcast(event, data) {
  getIO().emit(event, data)
}

function notifyRoom(roomId, event, data) {
  getIO().to(roomId).emit(event, data)
}

module.exports = { notifyUser, broadcast, notifyRoom }
