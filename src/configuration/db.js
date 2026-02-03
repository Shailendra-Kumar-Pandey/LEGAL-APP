import mongoose from 'mongoose';

// const connectDB = async ()=>{
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/Leagal-App');
//         console.log("mongoDB Connected....")
//     } catch (error) {
//         console.log(error)        
//     }
// }

const connectDB = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/Leagal-App')
    .then((res)=>{
        console.log("mongoDB is Connected....")
    })
    .catch((err)=>{
        console.log(err)
    })
}



export default connectDB;