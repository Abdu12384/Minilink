import dotenv from 'dotenv';
dotenv.config(); 

export const config = {
  baseUrl: process.env.BASE_URL || 'https://localhost:3000',
  db_url: process.env.MONGO_URI,
  isProduction: process.env.NODE_ENV === "production",
};
