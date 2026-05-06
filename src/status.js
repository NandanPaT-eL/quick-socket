const { getIO } = require('./server')

const STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read'
}

function markDelivered(roomId, messageId, userId) {
  if (!roomId) throw new Error('[quick-socket] markDelivered() requires a roomId. Received: ' + roomId)
  if (!messageId) throw new Error('[quick-socket] markDelivered() requires a messageId. Received: ' + messageId)
  if (!userId) throw new Error('[quick-socket] markDelivered() requires a userId. Received: ' + userId)
  getIO().to(roomId).emit('message:delivered', {
    messageId,
    userId,
    at: new Date()
  })
}

function markRead(roomId, messageId, userId) {
  if (!roomId) throw new Error('[quick-socket] markRead() requires a roomId. Received: ' + roomId)
  if (!messageId) throw new Error('[quick-socket] markRead() requires a messageId. Received: ' + messageId)
  if (!userId) throw new Error('[quick-socket] markRead() requires a userId. Received: ' + userId)
  getIO().to(roomId).emit('message:read', {
    messageId,
    userId,
    at: new Date()
  })
}

function markAllRead(roomId, userId) {
  if (!roomId) throw new Error('[quick-socket] markAllRead() requires a roomId. Received: ' + roomId)
  if (!userId) throw new Error('[quick-socket] markAllRead() requires a userId. Received: ' + userId)
  getIO().to(roomId).emit('messages:all_read', {
    userId,
    roomId,
    at: new Date()
  })
}

module.exports = { markDelivered, markRead, markAllRead, STATUS }
