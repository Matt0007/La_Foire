import mongoose from 'mongoose'

const User = mongoose.Schema(
    {
     firstname:{
        type:String,
        minLength:3,
        maxLength:20,
        required :true

     },

     email:{
        type:String,
        minLength:3,
        maxlength:25,
        required:true
     },
     password:{
        type:String,
        required:true,
        minLength:7,
        maxLength:25,
     }
    },
    {
        timestamps:{ createdAt:true}
    }
)

export default mongoose.model('User',User)