import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

export default function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    socket.on('message:new', (msg) => {
      setMessages((prev) => [...prev, msg])
    })

    socket.on('message:typing', ({ userId, isTyping }) => {
      if (userId !== socket.id) setIsTyping(isTyping)
    })

    socket.on('user:joined', ({ userId }) => {
      console.log('User joined:', userId)
    })

    return () => {
      socket.off('message:new')
      socket.off('message:typing')
      socket.off('user:joined')
    }
  }, [])

  const handleInput = (e) => {
    setInput(e.target.value)
    socket.emit('typing', {
      roomId: 'room-001',
      isTyping: e.target.value.length > 0
    })
  }

  const sendMessage = () => {
    if (!input.trim()) return
    socket.emit('message', { roomId: 'room-001', content: input })
    setInput('')
    socket.emit('typing', { roomId: 'room-001', isTyping: false })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>quick-socket React Demo</h2>

      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        height: '400px',
        overflowY: 'auto',
        padding: '16px',
        marginBottom: '12px',
        background: '#f9f9f9'
      }}>
        {messages.length === 0 && (
          <p style={{ color: '#aaa' }}>No messages yet. Say something!</p>
        )}
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#888' }}>
              {m.senderId.slice(0, 6)}
            </span>
            <p style={{ margin: '2px 0', background: '#fff', padding: '8px', borderRadius: '6px' }}>
              {m.content}
            </p>
          </div>
        ))}
        {isTyping && <p style={{ color: '#aaa', fontStyle: 'italic' }}>Someone is typing...</p>}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: '10px 20px', borderRadius: '6px', background: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
    </div>
  )
}