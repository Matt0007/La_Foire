import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

//ROUTES
import user from './router/user.js'
import message from './router/message.js'



dotenv.config();

const app = express();

//PORT 
const PORT = process.env.PORT || 8080;

//DATABASE 
mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
})
    .then(()=>console.log('Connection a mongoDB réussi'))
    .catch((error)=> console.log('Erreur de connexion à MongoDB :',error))

//MIDDLEWARE
app.use(express.json())
// USE ROUTER 
app.use('/api/user',user)
app.use('/api/message',message)



// SERVER LISTEN
app.listen(PORT,()=>{
    console.log(`Listening at hhtp://localhost:${PORT}`);
})

//