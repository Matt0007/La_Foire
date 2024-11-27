import express from 'express'
import User from '../models/user.model.js'

const router = express.Router();


//GET
router.get('/all',async(req,res)=>{
    try{
        const response = await User.find()
        res.status(200).json(response)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

//GET BY ID
router.get('/find/:idUser',async(req,res)=>{
    try{
  
        const response = await User.findById(req.params.idUser)
        res.status(200).json(response)
    }catch(error){
        res.status(500).json({error:error.message})
    }
    console.log('ID:', req.params.idUser)
})


//POST ( ajouter un nouvel utilisateur)
router.post('/add',async(req,res)=>{
    try{
        const response = await User.create(req.body)
        res.status(201).json(response)
    }catch(error){
        res.status(500).json({ error:error.message})
    }

})
//PUT
router.put('/update/:idUser',async(req,res)=>{
try{
    const response = await User.findByIdAndUpdate(
        req.params.idUser,
        req.body,
        {new:true}
    )
    res.status(200).json(response)
}catch(error){
    res.status(500).json({error:error.message})
}
})

//DELETE
router.delete('/delete/:idUser',async(req,res)=>{
    try{
        const response = await User.findByIdAndDelete(
            req.params.idUser
        )
        res.status(200).json(response)
    }catch(error){
        res.status(500).json({error:error.message})
    }
    console.log('ID:', req.params.idUser)
})

export default router;