import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
            minLength: 2,
            maxLength: 30,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phonNumber: {
            type: String,
            required: true,
            minLength: 10,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            trim: true,
        },
        role: {
            type: String,
            enum: ["admin", "lawyer", "client"],
            required: true,
            default: 'client'
        },
        status:{
            type: Boolean,
            default:true
        }
    },
    {
        timestamps : true
    }
);


userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        return next()
    }

    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    next();

    // const salt = await bcrypt.genSalt(10);

    // this.password = await bcrypt.hash(this.password, salt)

    // next()

})

export default mongoose.model('user', userSchema);