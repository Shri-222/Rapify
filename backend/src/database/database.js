
import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_URL = process.env.MONGODB_URL;

export const DBConnect = async () => {

    try {
        
        await mongoose.connect(MONGO_URL);

        console.log('MongoDB Connected Successfully');

    } catch (error) {
        
        console.error('MongoDB Connection Failed', error);
        process.exit(1);

    }
}