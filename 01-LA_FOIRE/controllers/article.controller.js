import Model from '../models/article.model.js'

export const post = async (req,res,next)=>{
    try{
        await Model.create(req.body)
        res.status(201).json("Votre article a été créé")
    }
    catch(error){
        next(error)
    }
}

export const all = async (req,res,next)=>{
    try{
        const article = await Model.find()
        
        res.status(200).json(article)
    }   
    catch(error){
        next(error)
    } 
}

export const avisArticlebyId = async (req,res,next)=>{
    try{
        const avis = await Model.findById(req.params.id).populate('avis')
        res.status(200).json(avis.avis)    
    }
    catch(error){
        next(error)
    }
}

export const allcroissant = async (req,res,next)=>{
    try{

        const article = await Model.find().sort({price:1})
        res.status(200).json(article)
    }
    catch(error){
        next(error)
    }
}

export const alldecroissant = async (req,res,next)=>{
    try{
        const article = await Model.find().sort({price:-1}).limit(2)
        res.status(200).json(article)
    }
    catch(error){
        next(error)
    }
}
export const updateArticle = async (req,res,next)=>{
    try{
        const article = await Model.findById(req.params.id)
        if (!article) return res.status(404).json("l'article n'existe pas !")
        await Model.findByIdAndUpdate(req.params.id)
        res.status(200).json("l'article a été modifié")    
    }
    catch(error){
        next(error)
    }
}

export const deleteArticle = async (req,res,next)=>{
    try{
        const article = await Model.findById(req.params.id)
        if (!article) return res.status(404).json("L'article n'existe pas !")
        await Model.findOneAndDelete(req.params.id)
        res.status(200).json("L'article a été supprimé")
    }
    catch(error){
        next(error)
    }
}

