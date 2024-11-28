import express from "express"
import { env } from "./config/index.js"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import cors from "cors";

//ROUTES
import userRoutes from "./routes/user.router.js"
import articleRoutes from './routes/article.router.js'
import avisRoutes from'./routes/avis.router.js'
import souhaitRoutes from './routes/souhait.router.js'
// APP EXPRESS
const app = express()

// PORT
const PORT = env.port || 8080

//DATABASE MONGOOSE
mongoose
    .connect(env.MONGO_URI,{dbName: env.DB_NAME})
    .then(()=> console.log('connexion a mongoDB Réussie !'))
    .catch (error => console.log(error))
// MIDDLEWARE
app.use(express.json())
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//PREFIX ROUTES
app.use("/api/user",userRoutes)
app.use("/api/article",articleRoutes)
app.use('/api/avis',avisRoutes)
app.use('/api/souhait',souhaitRoutes)

// SERVER
app.listen(PORT, () => {
  console.log(`LISTENING AT http://localhost:${PORT}`);
})