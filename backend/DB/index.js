import mongoose from "mongoose"
// console.log(process.env.MONGO_URI);

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log("connected with DB");
    } catch (error) {
        console.log(error);
        process.exit(1);        
    }
}
