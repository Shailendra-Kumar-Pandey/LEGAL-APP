import mongoose from 'mongoose';

const lawyerProfileSchema = new mongoose.Schema(
    {
        lawyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        barCouncilID: {
            type: String,
            required: true,
        },
        education:{
            type: String,
            enum: ['BA LLB', 'BBA LLB', 'BSc LLB', 'LLB', 'LLM', 'MLB', 'JD'],
            required: true
        },
        profileImgURL:{
            type: String,
            required: true
        },
        lawyerType: {
            type: String,
            enum : ["Criminal", "Civil", "Famliy", "Corporate"],
            required: true
        },
        experience : {
            type: Number,
            required: true  
        },
        totalCase: {
            type: Number,
        },
        DOB: {
            type: Date,
            required: true
        },
        address:{
            type: String,
            required: true,
            trim: true
        },
        status:{
            type: String,
            enum :['pendding', 'active', 'rejected', 'block'],
            default: 'pendding',
            required: true
        }   
    },
    {
        timestamps:true,
    }
)

export default mongoose.model('lawyerProfile', lawyerProfileSchema);