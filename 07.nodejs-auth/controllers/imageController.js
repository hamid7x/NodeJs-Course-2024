const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');
const Image = require('../models/Image');



const uploadImage = async (req, res) =>{
    try{
        const file = req.file;
        console.log(file)
        //check if the file exist in request
        if(!file) return res.status(400).json({success: false, message: "File required."});

        //upload image in cloudinary
        const {url, publicId} =  await uploadToCloudinary(file);

        //create new image, save in database
        const newImageUploaded = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newImageUploaded.save();
        
        res.status(201).json({success: true, message: "Image uploaded successfully.", image: newImageUploaded})
        
    }catch(error){
        console.log('error in uploadImage controller:->',error.message);
        res.status(500).json({success: fasle, messae: "Internal server error."})
    }
}

module.exports = uploadImage;