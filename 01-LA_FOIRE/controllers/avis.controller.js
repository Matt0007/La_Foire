import Model from '../models/avis.model.js'
import ModelArticle from '../models/article.model.js'


export const post = async (req,res,next)=>{
    try{
        const existingAvis = await Model.findOne({
        user: req.user.id,  
        article: req.params.id
    });

    if (existingAvis) {
        return res.status(409).json({
            message: "Vous avez déjà soumis un avis pour cet article."
        });
    }

        const verifArticle = await ModelArticle.findById(req.params.id)
        if (!verifArticle){
            return res.status(404).json("l'article n'existe pas")
        }
        const avis = await Model.create({
            ...req.body,
            article:req.params.id,
            user:req.user.id
        })
        
        const avisArticle = await ModelArticle.findByIdAndUpdate(
            req.body.article,
            { $push: { avis: avis._id } },
            {new:true}
        )
        
        res.status(201).json("l'avis a été créé")
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

export const getRatingById = async (req,res,next)=>{
    try{
        const AvisNote = await ModelArticle.findById(req.params.id).populate({
            path:'avis',
            options:{
                sort:{rating:1},
                limit:2
            }
        })
        res.status(200).json(AvisNote.avis)
    }
    catch(error){
        next(error)
    }
}

export const updateAvis = async (req,res,next)=>{
    try{
const verifUser = await Model.findById(req.params.id)
        if (req.user.id.toString() !== verifUser.user.toString()){
            return res.status(200).json("Vous n'êtes pas le propriétaire de cet avis")
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
        const verifUser = await Model.findById(req.params.id)
        if (req.user.id.toString() !== verifUser.user.toString()){
            return res.status(200).json("Vous n'êtes pas le propriétaire de cet avis")
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


export const likeAvis = async (req,res,next)=>{

try{
    const verifLike = await Model.findOne({
        like:{
            $elemMatch:{
            user:req.user.id   
            }
            
        }}
    )
    if (verifLike) {
    const like = await Model.findByIdAndUpdate(
        req.params.id,
        {
            $pull: {
                like: {
                    liker: true,
                    user: req.user.id
                }
            }
        },
        { new: true }
    );

     return res.status(200).json("Il va etre supprimé");
}
    const like = await Model.findByIdAndUpdate(
        req.params.id,
        {$push:{
            like:{
                liker:true,
                user:req.user.id
                }
            }  
        },
        {new:true}
    )
    return res.status(200).json("il va être ajouté")
}
catch(error){
    next(error)
}    
}


export const likeByAvis = async (req,res,next)=>{
    try{
        const avis = await Model.findById(req.params.id)
        if (!avis){
            return res.status(404).json("l'avis n'existe pas")
        }
        res.status(200).json(avis.like)
    }
    catch(error){
        next(error)
    }
}