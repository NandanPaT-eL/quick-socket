const { getIO } = require('./server')

const STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read'
}

function markDelivered(roomId, messageId, userId) {
  getIO().to(roomId).emit('message:delivered', {
    messageId,
    userId,
    at: new Date()
  })
}

function markRead(roomId, messageId, userId) {
  getIO().to(roomId).emit('message:read', {
    messageId,
    userId,
    at: new Date()
  })
}

function markAllRead(roomId, userId) {
  getIO().to(roomId).emit('messages:all_read', {
    userId,
    roomId,
    at: new Date()
  })
}

module.exports = { markDelivered, markRead, markAllRead, STATUS }
