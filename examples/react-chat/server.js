const http = require('http')
const express = require('express')
const quickSocket = require('quick-socket')

const app = express()
const server = http.createServer(app)

const io = quickSocket.init(server, { cors: 'http://localhost:5173' })

quickSocket.createRoom('room-001', {})

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  quickSocket.joinRoom(socket, 'room-001', {
    userId: socket.id,
    role: 'member'
  })

  socket.on('message', ({ roomId, content }) => {
    if (roomId !== 'room-001') return
    quickSocket.sendMessage(roomId, {
      senderId: socket.id,
      content,
      type: quickSocket.MESSAGE_TYPES.TEXT
    })
  })

  socket.on('typing', ({ roomId, isTyping }) => {
    if (roomId !== 'room-001') return
    quickSocket.sendTyping(roomId, socket.id, isTyping)
  })

  socket.on('disconnect', () => {
    quickSocket.leaveRoom(socket, 'room-001')
    console.log('Client disconnected:', socket.id)
  })
})

server.listen(3000, () => {
  console.log('Backend running on http://localhost:3000')
})