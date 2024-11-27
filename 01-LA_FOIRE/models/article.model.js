import mongoose from 'mongoose'

const articleSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    avis:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Avis'
    }],
    picture:{
        img:{
            type:String,
            required:true
        },
        img2:{
            type:String,
        },
        img3:{
            type:String,
        },
        img4:{
            type:String,
        }
    },
    status:{
        type:Boolean,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }
})

export default mongoose.model('Article',articleSchema)