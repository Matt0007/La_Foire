import express from "express"
import { verifieToken } from "../middlewares/auth.js"
import { signup, getUsers, getUserById, deleteUser, updateUser, sign, getUsersActive, } from '../controllers/user.controller.js'


const router = express.Router()

router.post("/signup",signup)
router.post("/sign",sign)
router.get("/get",getUsers)
router.get("/get/:id",getUserById)
router.get('/getActive',getUsersActive)
router.delete('/delete/:id',verifieToken,deleteUser)
router.put('/update/:id',verifieToken,updateUser)


export default router