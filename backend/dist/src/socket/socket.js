import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        methods: ["GET", "POST"],
        credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000,
    transports: ['websocket', 'polling'],
    connectTimeout: 45000
});
const userSocketMap = {};
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
io.on('connection', (socket) => {
    console.log('[Socket Debug] New connection:', socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
    socket.on('sendMessage', (message) => {
        const receiverSocketId = getReceiverSocketId(message.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', message);
        }
    });
    socket.on('disconnect', () => {
        console.log('[Socket Debug] Disconnection:', socket.id);
        if (userId) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});
export { app, server, io };
