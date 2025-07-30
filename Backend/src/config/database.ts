import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
      let db_url = process.env.MONGO_URI;
        await mongoose.connect(db_url!);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('MongoDB connection error', error);
    }
};