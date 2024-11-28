import mongoose, { mongo, Schema } from "mongoose";

const souhaitSchema = mongoose.Schema({
    souhait: [{
        article: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }

    }
    ]
}
)

export default mongoose.model('Souhait', souhaitSchema)