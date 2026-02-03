import mongoose from 'mongoose';

const clientCaseSchema = new mongoose.Schema(
    {
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'user'
        },
        caseSummry: {
            type: String,
            minLength: 100,
            trim: true,
            required: true
        },
        location:{
            type: String,
            requried: true
        },
        document:[
            {
                documentName:{
                    type: String,
                    required:true
                },
                documentURL:{
                    type:String,
                    required: true
                }
            }

        ],
        opponentLawyer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('clientCase', clientCaseSchema);