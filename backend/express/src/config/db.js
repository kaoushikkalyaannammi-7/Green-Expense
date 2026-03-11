import mongoose from 'mongoose';

const connectDB=async()=>{
    try{
      
    
    
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);

console.log("MongoDb connected successfully");
    }
    catch(err){
        console.log("mongoDB connection error:" + err.message);
        process.exit(1);
    }
}

export default connectDB;