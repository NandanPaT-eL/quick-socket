const { Server } = require('socket.io')

let io

function init(httpServer, options = {}) {
  io = new Server(httpServer, {
    cors: {
      origin: options.cors || '*',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    console.log(`[quick-socket] Client connected: ${socket.id}`)
    socket.on('disconnect', () => {
      console.log(`[quick-socket] Client disconnected: ${socket.id}`)
    })
  })

  return io
}

function getIO() {
  if (!io) throw new Error('[quick-socket] Not initialized. Call init() first.')
  return io
}

module.exports = { init, getIO }
