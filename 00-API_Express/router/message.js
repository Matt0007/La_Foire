import express from 'express'
import Message from '../models/message.model.js'

const router = express.Router();


//POST

router.post('/add',async(req,res)=>{
    try{
        const response = await Message.create(req.body)
        res.status(201).json(response)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

//GET 

router.get('/all',async(req,res)=>{
    try{
        const response = await Message.find()
        res.status(200).json(response)

    }catch(error){
        res.status(500).json({error:error.message})
    }
})

//GET BY ID
router.get('/find/:idMessage',async(req,res)=>{
    try{
        const response = await Message.findById(req.params.idMessage)
        res.status(200).json(response)
        
    }catch(error){
        res.status(500).json({error:error.message})
    }
})
//GET BY USER
router.get('/all/message/:idUser',async(req,res)=>{
    try{
        console.log(req.params.idUser)
        const message = await Message.find({ user: req.params.idUser }).populate('user')
        res.status(200).json(message)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
})

//PUT
router.put('/update/:idMessage',async(req,res)=>{
const userId = req.body.user
console.log(userId)
    try{

        const message = await Message.findById(req.params.idMessage)
        if ( userId == message.user){
            const response = await Message.findByIdAndUpdate(
                req.params.idMessage,
                req.body,
                {new:true}
            )
            res.status(200).json("votre message a été modifié par "+ req.body.content)
        }
        else{
            res.status(403).json("Vous n'etes pas l'auteur du message")
        }
        
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

//DELETE 

router.delete('/delete/:idMessage',async(req,res)=>{
    const userId = req.body.user
try{
    const message = await Message.findById(req.params.idMessage)
        console.log(message)
    if ( userId == message.user){
      const response = await Message.findByIdAndDelete(
        req.params.idMessage
    )
    res.status(200).json("votre message a été supprimé")  
    }
    else{
        res.status(403).json("Vous n'etes pas l'auteur du message")
    }
    
}catch(error){
    res.status(500).json({error:error.message})
}

})

export default router;