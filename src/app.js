import express from 'express';
import lawyerRouter from './routes/lawyer.js';
import clientRouter from './routes/client.js';
import authRouter from './routes/authUser.js';
import adminRouter from './routes/admin.js';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Build in Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Router
app.use('/client', clientRouter)
app.use('/lawyer', lawyerRouter)
app.use('/auth', authRouter)
app.use('/admin', adminRouter)


export default app;