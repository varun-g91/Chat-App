import express from 'express';
import authRoutes from '../src/routes/auth.route.js';
import messageRoutes from '../src/routes/message.route.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import { app, server } from './socket/socket.js';

dotenv.config();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use(globalErrorHandler);

server.listen(5000, () => {
    console.log('Server is running on port ' + PORT);
});

// Todo: add socket.io for real-time communication
// Todo: configure server for deployment

