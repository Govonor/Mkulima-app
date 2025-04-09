const { Server } = require("socket.io");

// Create a Socket.io instance that hooks into the existing HTTP server
const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // You can specify allowed domains here for security
      methods: ["GET", "POST"],
    },
  });

  // Connect a new socket
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Listen for a specific event (e.g., a chat message)
    socket.on("sendMessage", (data) => {
      console.log("Message received:", data);
      // Emit a message to all connected clients (broadcast)
      io.emit("newMessage", data);
    });

    // Example of emitting events back to the client
    socket.emit("welcomeMessage", { message: "Welcome to Ask Mkulima!" });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  // Return the instance of the socket server to be used in the app
  return io;
};

module.exports = setupSocket;
