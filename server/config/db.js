const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connect = async()=>{
    try{
        const connectDB= await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected database '${connectDB.connection.host}`);
    }
    catch(error){
        console.log(error);
    }
}

module.exports=connect;