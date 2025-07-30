import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import morgan from 'morgan';
import { authRoutes } from './routes/routes';



dotenv.config();
connectDB();
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: process.env.ORIGIN,
  methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders:["Authorization","Content-Type"],
  credentials:true
}));

app.use('/',authRoutes)


app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
  console.log(err);
  res.status(500).json({message:err.message || "Something went wrong"});
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
