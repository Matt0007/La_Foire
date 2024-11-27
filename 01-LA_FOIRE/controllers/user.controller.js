import Model from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../config/index.js';

export const signup = async (req,res,next)=>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    await Model.create({
      ...req.body,
      password: hashedPassword
  })
    
    res.status(201).json("User has been created !")
  }
  catch(error){
    next(error)
  }
}

export const sign = async (req,res)=>{
  try{
    const user = await Model.findOne({email:req.body.email})

    if (!user)return res.status(404).json ('User not found!')

      const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password 
    )
    if(!comparePassword)return res.status(400).json ("Wrong Credentials")
      const token=jwt.sign(
        {id:user._id},
        env.token,
        {expiresIn:"24h"}
      )
      const{password,...others} = user._doc

      res.cookie('access_token',token,{httpOnly:true})
      .status(200)
      .json(others)

  }
  catch(error){
    console.log(error)
  }
}

export const getUsers = async(req,res)=>{
  try{
    const users = await Model.find()
    res.status(200).json(users)
  }
  catch (error) {
    console.log(error);
  }
}

export const getUserById = async (req,res)=>{
  try{
 const user = await Model.findById(req.params.id)
 res.status(200).json(user)
  }
  catch (error) {
    console.log(error);
  }
}

export const deleteUser = async (req,res,next) =>{
  try{
    const user = await Model.findById(req.params.id)
    if(!user) return res.status(404).json ("json not found")

      if (req.params.id !== req.user.id){
        res.status(200).json("Vous n'etes pas l'utilisateur du compte que vous voulez supprimé")
      }
        await Model.findOneAndDelete(req.params.id)
        res.status(200).json(`L'utilisateur avec l'id ${req.params.id} a été supprimé`)
      
      
    
  }
  catch(error){
    next(error)
  }
}

export const updateUser = async (req,res,next)=>{
  try{
    const user = await Model.findById(req.params.id)
    if(!user) return res.status(404).json ("json not found")

    if (req.params.id !== req.user.id){
        return res.status(200).json("Vous n'etes pas l'utilisateur du compte que vous voulez supprimé")
      }

        const userUpdated = await Model.findByIdAndUpdate(
          req.params.id,
          {$set:req.body},
          {new:true}
        )
        res.status(200).json(userUpdated)
        
      

    
  }
  catch(error){
    next(error)
  }
}