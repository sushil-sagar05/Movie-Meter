const socketIo = require('socket.io');
let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`Client ${socket.id} joined room ${room}`);
      io.to(room).emit('chat', { message: `User ${socket.id} has joined the room`, fullname: 'System' });
    });

    socket.on('chat', (payload) => {
      const { roomId, message } = payload;
      console.log('What is payload', payload);
      io.to(roomId).emit('chat', payload);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

module.exports = { initializeSocket, getIo: () => io };