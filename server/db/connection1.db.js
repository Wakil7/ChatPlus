import mongoose from 'mongoose';

const connectDB = async() => {
    try{
        const MONGODB_URL = process.env.MONGODB_URL;
        const instance = await mongoose.connect(MONGODB_URL, 
            {
                dbName: "chatapp",
                serverSelectionTimeoutMS: 30000,
                family: 4
            }
        );
        console.log(`MongoDB Connected: ${instance.connection.host}`);
    }
    catch(error){
        console.log(error);
    }
}

export default connectDB;