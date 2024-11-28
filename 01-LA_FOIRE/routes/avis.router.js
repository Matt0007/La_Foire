import express from 'express'
import { verifieToken } from "../middlewares/auth.js"
import { deleteAvis, getRating, getRatingById, likeAvis, likeByAvis, post, updateAvis } from '../controllers/avis.controller.js'



const router = express.Router()

router.post ('/post/:id',verifieToken,post)
router.put ('/update/:id',verifieToken,updateAvis)
router.put('/updateLike/:id',verifieToken,likeAvis)
router.delete ('/delete/:id',verifieToken,deleteAvis)
router.get('/get',getRating)
router.get('/getAvis/:id',getRatingById)
router.get('/avisArticle/:id',likeByAvis)

export default router