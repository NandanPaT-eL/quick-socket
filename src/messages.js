const { getIO } = require('./server')

const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  SYSTEM: 'system'
}

function sendMessage(roomId, message) {
  if (!roomId) throw new Error(
    '[quick-socket] sendMessage() requires a roomId as the first argument. Received: ' + roomId
  )
  if (!message || typeof message !== 'object') throw new Error(
    '[quick-socket] sendMessage() requires a message object as the second argument. ' +
    'Expected: { senderId: string, content: string, type?: string }'
  )
  if (!message.senderId) throw new Error(
    '[quick-socket] sendMessage() requires message.senderId. ' +
    'Each message must identify who sent it.'
  )
  if (message.content === undefined || message.content === null) throw new Error(
    '[quick-socket] sendMessage() requires message.content. ' +
    'The message body cannot be empty.'
  )
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
