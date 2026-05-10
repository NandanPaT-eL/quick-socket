function authMiddleware(authFn) {
  return (socket, next) => {
    const token = socket.handshake.auth?.token
    if (!token) return next(new Error(
      '[quick-socket] Authentication failed: no token found in socket.handshake.auth.token. ' +
      'Pass a token when connecting: io("url", { auth: { token: "your-jwt" } })'
    ))
    try {
      const user = authFn(token)
      socket.user = user
      next()
    } catch (err) {
      next(new Error(
        `[quick-socket] Authentication failed: the authFn you provided threw an error — ${err.message}. ` +
        'Verify that your authFn can handle the token format being sent by the client.'
      ))
    }
  }
}

module.exports = { authMiddleware }
