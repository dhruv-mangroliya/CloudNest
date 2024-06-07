const File = require("../models/File");
const cloudinary = require("cloudinary").v2;


//localFileUpload -> handler function

exports.localFileUpload = async(req, res) => {
    try{

        //fetch file
        const file = req.files.file;  //"here file is the key we passed during POST request"
        console.log("Files are here -> ", file);

        //make path url to move file here in server side
        let path = __dirname + "/files" + Date.now() + `.${file.name.split('.')[1]}`; 
        //split after . first index is nme and 2nd index means[1] is format xyz + png
        console.log(path);

        //.mv moves files to given location in server side
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: 'local file uploaded successfully',
        });

    }
    catch(error){
        console.log(error);
    }

}


function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}


async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
} 



//image upload handler
exports.imageUpload = async(req, res) => {
    try{
        //data fetch
        const {name, email, tags} = req.body;
        console.log(name, email,tags);

        const file = req.files.imageFile;
        console.log(file);

        //validations
        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase() ;


        //if not correct type of file then return it.
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File formate is not supported.',
            })
        }

        //upload on cloudinary
        const response = await uploadFileToCloudinary(file, "fileUploadProject");
        console.log(response);


        //save entry in DB.
        const fileData = await File.create({
            name, 
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully updated."
        })


    }catch(err){
        console.error(err);
        res.status(400).json({
            success: false,
            message: 'something went wrong.'
        });
    }
}


//video upload handler
exports.videoUpload = async(req, res) => {
    try{
        //data fetch
        const {name, email, tags} = req.body;
        console.log(name, email,tags);

        const file = req.files.videoFile;
        console.log(file);

        //validations
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase() ;


        //if not correct type of file then return it.
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File formate is not supported.',
            })
        }

        //upload on cloudinary
        const response = await uploadFileToCloudinary(file, "fileUploadProject");
        console.log(response);


        //save entry in DB.
        const fileData = await File.create({
            name, 
            tags,
            email,
            videoUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video successfully updated."
        })


    }catch(err){
        console.error(err);
        res.status(400).json({
            success: false,
            message: 'something went wrong.'
        });
    }
}



//image size reducer
exports.imageSizeReducer = async(req, res) => {
    try{
        //data fetch
        const {name, email, tags, quality} = req.body;
        console.log(name, email,tags);

        const file = req.files.imageFile;
        console.log(file);

        //validations
        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase() ;


        //if not correct type of file then return it.
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File formate is not supported.',
            })
        }

        //upload on cloudinary
        const response = await uploadFileToCloudinary(file, "fileUploadProject", quality);
        console.log(response);


        //save entry in DB.
        const fileData = await File.create({
            name, 
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully updated."
        })


    }catch(err){
        console.error(err);
        res.status(400).json({
            success: false,
            message: 'something went wrong.'
        });
    }
}