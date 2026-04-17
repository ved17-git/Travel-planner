import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/userRoutes.js'
import { tripRouter } from './routes/tripRoutes.js'
import 'dotenv/config'

const app=express()
const PORT=process.env.PORT

app.use(express.json())
app.use(cors())


app.use('/', userRouter)
app.use('/', tripRouter)


let isConnected = false;
async function connectDB(){

  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }
  try {
    const connect=await  mongoose.connect(process.env.MONGO_DB_URL as string)
if (connect) {
      isConnected = connect.connection.readyState === 1;
      console.log("New database connection established");
    }

  } catch (error) {
    console.log("db connect err");
    console.log(error); 
  }
}

connectDB()


app.get('/',(req,res)=>{
    res.json({
        msg:"test endpoint"
    })
})

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})

export default app;



