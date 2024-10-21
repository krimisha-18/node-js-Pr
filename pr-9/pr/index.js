const express = require("express");
const cloudinary = require('cloudinary').v2
const connectDB = require("./config/db");
const app = express()
const port = 8000;
connectDB()

const cors = require('cors')
app.use(cors());

app.use(express.json());

app.set('view engine','ejs')
app.use(express.urlencoded())
  // Configuration
  cloudinary.config({ 
    cloud_name: 'dvlmfmhh0', 
    api_key: '651819352999915', 
    api_secret: '<your_api_secret>'
});

app.use('/api/v1',require('./routes/indexRoutes'))


app.listen(port,(err) =>{
    if(err) console.log(err);

    console.log(`server is running on port ${port}`)
})
