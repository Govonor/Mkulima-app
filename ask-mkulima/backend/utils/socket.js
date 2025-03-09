const socketIo = require('socket.io');

function setupSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: '*', // Adjust as needed for security
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on('send_message', (data) => {
      io.to(data.sender).emit('message', data); // send to the room
    });

    socket.on('typing', (roomId) => {
      socket.to(roomId).emit('typing', socket.id);
    });

    socket.on('stopped typing', (roomId) => {
      socket.to(roomId).emit('stopped typing', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}

module.exports = { setupSocket };