import express from 'express';
import authRoutes from '../src/routes/auth.route.js';
import messageRoutes from '../src/routes/message.route.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import { app, server } from './socket/socket.js';
dotenv.config();
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173', 'https://chat-app-client-wine-nine.vercel.app'],
    credentials: true
}));
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.get('/api/health', (_req, res) => {
    console.log("Server accepting requests");
    res.status(200).json({ message: 'Server is accepting requests' });
});
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use(globalErrorHandler);
server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
// Todo: add socket.io for real-time communication
// Todo: configure server for deployment
