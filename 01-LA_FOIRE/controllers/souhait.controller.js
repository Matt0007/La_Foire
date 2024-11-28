import ModelSouhait from '../models/souhait.model'

usersId=req.user.id
articleId= req.params.id

export const ajoutSouhait = async (req,res,next)=>{
    try{
        await Model.create()
        const souhait = await ModelSouhait.findByIdAndUpdate(
            req.params.id,
            {$push:{
                user:UserId,
                article:articleId
            }}
        )
    }
    catch(error){
        next(error)
    }
}