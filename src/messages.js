const { getIO } = require('./server')

const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  SYSTEM: 'system'
}

function sendMessage(roomId, message) {
  const payload = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    roomId,
    senderId: message.senderId,
    content: message.content,
    type: message.type || MESSAGE_TYPES.TEXT,
    createdAt: new Date()
  }
  getIO().to(roomId).emit('message:new', payload)
  return payload
}

function editMessage(roomId, messageId, newContent) {
  getIO().to(roomId).emit('message:edited', {
    messageId,
    content: newContent,
    editedAt: new Date()
  })
}

function deleteMessage(roomId, messageId) {
  getIO().to(roomId).emit('message:deleted', {
    messageId,
    deletedAt: new Date()
  })
}

function sendTyping(roomId, userId, isTyping) {
  getIO().to(roomId).emit('message:typing', { userId, isTyping })
}

module.exports = { sendMessage, editMessage, deleteMessage, sendTyping, MESSAGE_TYPES }
