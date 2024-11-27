import jwt from 'jsonwebtoken'
import { env } from '../config/index.js'
import { createError } from './error.js'

export const verifieToken = (req,res,next) =>{
    const token = req.cookies.access_token
    if(!token) return next(createError(401,"Access Denied"))
    
    jwt.verify(token,env.token, (err,user)=>{
        if (err){
            return next(createError(403,"Token non valide !"))
        }
        req.user = user

        next();
    })
}