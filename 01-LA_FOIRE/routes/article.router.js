import express from "express"
import { verifieToken } from "../middlewares/auth.js"

import {all,allcroissant,alldecroissant,avisArticlebyId,deleteArticle,post, updateArticle} from '../controllers/article.controller.js'
const router = express.Router()

router.post('/post',post)
router.get('/all',all)
router.get('/allcroissant',allcroissant)
router.get('/alldecroissant',alldecroissant)
router.get('/avisArticle/:id',avisArticlebyId)
router.delete('/delete/:id',deleteArticle)
router.put('/update/:id',updateArticle)



export default router