import express from 'express';
import lawyerRouter from './routes/lawyer.js';
import clientRouter from './routes/client.js';
import authRouter from './routes/authUser.js';
import adminRouter from './routes/admin.js';

const app = express();

// Build in Middleware
app.use(express.json())

// base URL:-  (http://127.0.0.1:5050)
// Router
app.use('/client', clientRouter)
app.use('/lawyer', lawyerRouter)
app.use('/auth', authRouter)
app.use('/admin', adminRouter)


export default app;