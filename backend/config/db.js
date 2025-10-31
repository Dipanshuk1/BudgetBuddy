import mongoose from "mongoose"
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to DB");
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}
export default connectDB;