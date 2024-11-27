import mongoose from 'mongoose'

const avisSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    article:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article',
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    

},
{
    timestamps:{createdAt:true}
}
)
export default mongoose.model('Avis',avisSchema)