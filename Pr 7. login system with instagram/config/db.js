
        //    `
        const mongoose = require('mongoose');

        const connectDB = async () => {
            try {
                await mongoose.connect('mongodb+srv://krimisha025:krimisha025@cluster0.jrq90.mongodb.net/insta-post-pr-7`', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                console.log('MongoDB connected');
            } catch (err) {
                console.error(err.message);
                process.exit(1);
            }
        };
        
        module.exports = connectDB;
        