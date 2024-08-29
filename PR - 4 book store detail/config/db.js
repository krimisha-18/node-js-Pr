const mongoose = require('mongoose');

const con = mongoose.connect(
    `mongodb+srv://krimisha025:krimisha025@cluster0.jrq90.mongodb.net/pr-4-book-store`
);

const db = mongoose.connection;

db.on('connected', (err) => {
    if (err) 
    {
        console.log(err);
        return false;
    }
    console.log(`YEAH....MONGODB CONNECT....!!`);

})
module.exports = db
