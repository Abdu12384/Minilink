import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import morgan from 'morgan';
import { authRoutes } from './routes/auth.routes';
import { urlRoutes } from './routes/url.routes';
import { userRoutes } from './routes/user.routes';


dotenv.config();
connectDB();
const app = express();
app.use(cookieParser())
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: process.env.ORIGIN,
  methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders:["Authorization","Content-Type"],
  credentials:true
}));


app.use('/',urlRoutes)
app.use('/auth',authRoutes)
app.use('/user',userRoutes)



app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
  console.log(err);
  res.status(500).json({message:err.message || "Something went wrong"});
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
