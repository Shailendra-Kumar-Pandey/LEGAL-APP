import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './configuration/db.js';
dotenv.config();

// Connect Database
connectDB()

let PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})