const mongoose = require('mongoose')

const connectDB = async() =>{

    try {
        
        const conn = await mongoose.connect(
           `mongodb+srv://krimisha025:krimisha025@cluster0.jrq90.mongodb.net/PR-7-insta-post-passport`
        )
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        return false;
        
    }
}
module.exports = connectDB;