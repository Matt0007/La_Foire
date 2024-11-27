import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: process.env.PORT,
  DB_NAME:process.env.DB_NAME,
  MONGO_URI: process.env.MONGO_URI,
  token:process.env.TOKEN
}