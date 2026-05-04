# React Chat Example

A minimal working demo of [quick-socket](https://github.com/Aaromalpm/quick-socket) with a React frontend.

## What this demonstrates
- Joining a room on connect
- Sending and receiving messages in real time
- Typing indicators

## Prerequisites
- Node.js 16+

## Run the backend

```bash
cd examples/react-chat
npm install
npm start
```

## Run the frontend

```bash
cd examples/react-chat/client
npm install
npm run dev
```

Open http://localhost:5173 in two browser tabs to test real-time messaging.

## Note
The socket is initialized at module level for simplicity.
In a production app, manage the socket inside a React context or custom hook.