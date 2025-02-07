const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const { uploadImage, getAllImages, deleteImage } = require("../controllers/imageController");

//uploade iamge router
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImage
);
router.get("/get", authMiddleware, adminMiddleware, getAllImages);
router.delete("/:id",authMiddleware,adminMiddleware,deleteImage);
module.exports = router;
