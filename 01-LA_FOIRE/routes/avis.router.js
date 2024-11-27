import express from 'express'
import { verifieToken } from "../middlewares/auth.js"
import { post, updateAvis } from '../controllers/avis.controller.js'



const router = express.Router()

router.post ('/post',verifieToken,post)
router.put ('/update/:id',verifieToken,updateAvis)

export default router