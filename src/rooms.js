const { getIO } = require('./server')
const { clearRoomMessages } = require('./messages')

const rooms = new Map()

function createRoom(roomId, meta = {}) {
  rooms.set(roomId, {
    id: roomId,
    participants: [],
    meta,
    createdAt: new Date()
  })
  return rooms.get(roomId)
}

function joinRoom(socket, roomId, userMeta = {}) {
  socket.join(roomId)
  const room = rooms.get(roomId)
  if (room) {
    room.participants.push({
      socketId: socket.id,
      userId: userMeta.userId,
      role: userMeta.role || 'member',
      joinedAt: new Date()
    })
  }
  getIO().to(roomId).emit('user:joined', { userId: userMeta.userId, roomId })
}

function leaveRoom(socket, roomId) {
  socket.leave(roomId)
  const room = rooms.get(roomId)
  if (room) {
    room.participants = room.participants.filter(p => p.socketId !== socket.id)
  }
  getIO().to(roomId).emit('user:left', { socketId: socket.id, roomId })
}

function getRoomParticipants(roomId) {
  return rooms.get(roomId)?.participants || []
}

function closeRoom(roomId) {
  getIO().to(roomId).emit('room:closed', { roomId })
  clearRoomMessages(roomId)
  rooms.delete(roomId)
}

module.exports = { createRoom, joinRoom, leaveRoom, getRoomParticipants, closeRoom }
