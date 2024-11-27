import express from 'express'
import { verifieToken } from "../middlewares/auth.js"
import { deleteAvis, getRating, post, updateAvis } from '../controllers/avis.controller.js'



const router = express.Router()

router.post ('/post',verifieToken,post)
router.put ('/update/:id',verifieToken,updateAvis)
router.delete ('/delete/:id',verifieToken,deleteAvis)
router.get('/get',getRating)

export default router