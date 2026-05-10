const { getIO } = require('./server')

function notifyUser(userId, event, data) {
  if (!userId) throw new Error(
    '[quick-socket] notifyUser() requires a userId. Received: ' + userId
  )
  if (!event || typeof event !== 'string') throw new Error(
    '[quick-socket] notifyUser() requires an event name string. Received: ' + JSON.stringify(event)
  )
  getIO().to(userId).emit(event, data)
}

function broadcast(event, data) {
  if (!event || typeof event !== 'string') throw new Error(
    '[quick-socket] broadcast() requires an event name string. Received: ' + JSON.stringify(event)
  )
  getIO().emit(event, data)
}

function notifyRoom(roomId, event, data) {
  if (!roomId) throw new Error(
    '[quick-socket] notifyRoom() requires a roomId. Received: ' + roomId
  )
  if (!event || typeof event !== 'string') throw new Error(
    '[quick-socket] notifyRoom() requires an event name string. Received: ' + JSON.stringify(event)
  )
  getIO().to(roomId).emit(event, data)
}

module.exports = { notifyUser, broadcast, notifyRoom }
