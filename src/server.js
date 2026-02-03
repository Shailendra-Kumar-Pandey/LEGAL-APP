import app from './app.js';
import connectDB from './configuration/db.js';


connectDB()


app.listen(5050, ()=>{
    console.log("Server is running...")
})