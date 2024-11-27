import mongoose from 'mongoose'

const Message = mongoose.Schema(
    {
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
     },
     content:{
        type:String,
        minlength:8,
        maxLength:120,
        required:true
     }
    },
    {
        timestamps:{ createdAt:true}
    }
)

export default mongoose.model('Message',Message)