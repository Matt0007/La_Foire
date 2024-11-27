import Model from '../models/avis.model.js'
import ModelArticle from '../models/article.model.js'


export const post = async (req,res,next)=>{
    try{
        const avis = await Model.create({
            ...req.body,
            user:req.user.id
            
        })
        const avisArticle = await ModelArticle.findByIdAndUpdate(
            req.body.article,
            { $push: { avis: avis._id } },
            {new:true}

        )
        res.status(201).json(avisArticle)
    }
    catch(error){
        next(error)
    }
}

export const updateAvis = async (req,res,next)=>{
    try{

        await Model.findByIdAndUpdate(req.params.id)
        res.status(200).json(req.user.id)
    }
    catch(error){
        next(error)
    }
}

