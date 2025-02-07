const express = require("express");
const {
  userRegister,
  userLogin,
  changePassword,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//auth routes
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
