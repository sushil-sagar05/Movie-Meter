const socketIo = require('socket.io');
let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL ||'*',
      credentials: true, 
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {

    socket.on('joinRoom', (room) => {
      socket.join(room);
      io.to(room).emit('chat', { message: `User ${socket.id} has joined the room`, fullname: 'System' });
    });

    socket.on('chat', (payload) => {
      const { roomId, message } = payload; 
      const newMessage = {
          fullname: message.fullname,
          message: message.message,
          sender: message.sender,
          timestamp: message.timestamp,
      };
      io.to(roomId).emit('chat', newMessage); 
  });
  

    socket.on('disconnect', () => {
      // console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

module.exports = { initializeSocket, getIo: () => io };