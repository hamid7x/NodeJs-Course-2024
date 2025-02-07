const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const Image = require("../models/Image");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    //check if the file exist in request
    if (!file)
      return res
        .status(400)
        .json({ success: false, message: "File required." });

    //upload image in cloudinary
    const { url, publicId } = await uploadToCloudinary(file.path);

    //create new image, save in database
    const newImageUploaded = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newImageUploaded.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully.",
      image: newImageUploaded,
    });
  } catch (error) {
    console.log("error in uploadImage controller:->", error.message);
    res.status(500).json({ success: false, messae: "Internal server error." });
  }
};

const getAllImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit || 2;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    let crrPage = page;
    const nextPage = page === totalPages ? 1 : ++crrPage;

    //tutrial method for sorting objec
    // const sortObj = {};
    // sortObj[sortBy] = sortOrder;

    //my method for sorting to avoid creating extra variables
    const images = await Image.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    res
      .status(200)
      .json({
        success: true,
        currentPage: page,
        nextPage,
        totalImages,
        totalPages,
        data: images,
      });
  } catch (error) {
    console.log("error in getAllImages controller:->", error.message);
    res.status(500).json({ success: false, messae: "Internal server error." });
  }
};

const deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ success: "image not found." });

    //check if the authonticated user is the owner of the image
    if (image.uploadedBy.toString() !== userId)
      return res.status(400).json({
        success: false,
        message: "You can't delete this image, you are not the owner.",
      });

    //delete image from cloudinary storage
    await cloudinary.uploader.destroy(image.publicId);

    //delete image from mongodb storage
    await Image.findByIdAndDelete(imageId);

    res
      .status(200)
      .json({ success: true, message: "Image deleted successfully." });
  } catch (error) {
    console.log("error in deleteImage controller:->", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  uploadImage,
  getAllImages,
  deleteImage,
};
