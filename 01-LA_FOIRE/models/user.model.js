import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema(
    {
        prenom: {
        type:String, 
        required:true
    },
        avatar:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }

}
)
userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('User',userSchema)
