import express from 'express';
import authRoutes from '../src/routes/auth.route.js';
import messageRoutes from '../src/routes/message.route.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import globalErrorHandler from './middleware/globalErrorHandler.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use(globalErrorHandler);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

