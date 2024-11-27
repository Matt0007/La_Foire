import Model from '../models/avis.model.js'
import ModelArticle from '../models/article.model.js'


export const post = async (req,res,next)=>{
    try{
        
        const verifArticle = await ModelArticle.findById(req.body.article)
        if (!verifArticle){
            return res.status(400).json("l'article n'existe pas")
        }
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

export const getRating = async (req,res,next)=>{
    try{
        const avisNote = await Model.find().sort({rating:1})
        res.status(200).json(avisNote)
    }
    catch(error){
        next(error)
    }
}

export const updateAvis = async (req,res,next)=>{
    try{
        
        if (req.user.id !== req.body.user){
            return res.status(200).json("Vous n'etes pas le propriétaire de ce commentaire")
        }
           const avis = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
           )

           if (!avis){
            return res.status(404).json("l'avis n'existe pas")
        }

            const avisArticle = await ModelArticle.findByIdAndUpdate(
                req.body.article,
                { $push: { avis: avis._id } },
                {new:true}
    
            )
            if(!avisArticle){
                return res.status(404).json ("cette article n'existe pas")
            }
            res.status(200).json({
                message:"Les modifications on été bien faite, voici les nouvelle infos :",
                data:{
                    rating:avis.rating,
                    comment:avis.comment
                }
            } )    
    }
    catch(error){
        next(error)
    }
}

export const deleteAvis = async (req,res,next)=>{
    try{
        if (req.user.id !== req.body.user){
            return res.status(200).json("Vous n'etes pas le propriétaire de ce commentaire")
        }
            const avis = await Model.findByIdAndDelete(req.params.id)

            if(!avis){
                return res.status(404).json("l'avis n'existe pas ")
            }
            const avisArticle = await ModelArticle.findByIdAndUpdate(
                req.body.article,
                {$pull:{avis:avis._id}}
            )
            if(!avisArticle){
                return req.status(404).json("l'article n'existe pas")
            }
            res.status(200).json("l'article " + avis._id + " est bien suppriméé")

        
    }
    catch(error){
        next(error)
    }
}