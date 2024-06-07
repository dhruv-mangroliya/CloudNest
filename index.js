//app creation
const express = require("express");
const app = express();




//port find out
require("dotenv").config();
const PORT = process.env.PORT || 3000;



//middleware addition
app.use(express.json());

// 1) Middleware for file upload
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));



//db connection
const db = require("./config/database");
db.connect();




//cloud connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();




//api route mounting
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);


//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})