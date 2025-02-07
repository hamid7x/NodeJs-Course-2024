const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    //check if all fields are provided
    if (!username || !email || !password)
      return res.json({
        success: false,
        message: "you must provide all inputs fields.",
      });
    //check if username is already exist
    const userNameCheck = await User.findOne({ username });

    if (userNameCheck)
      return res.json({ success: false, message: "username already taken" });
    //check if email is already exist
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ success: false, message: "email already exist" });
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      role: role || "user",
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "user register successfully.",
      user: newUser,
    });
  } catch (e) {
    console.log(`error in userRegister controller: -> `, e.message);
    res.status(500).json({ success: false, error: "internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exist in database or not
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "email doesn't exist" });

    //check if password correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.json({ success: false, message: "Invalid credentials!" });

    //create user token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );
    // req.cookies('token',accessToken);
    res.status(200).json({
      success: true,
      message: "user login successfully.",
      token: accessToken,
    });
  } catch (e) {
    console.log("error in loginUser: ->", e.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

//change passwrod controller
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.userInfo.userId;
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });

    //check if the old password is correct
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch)
      return res
        .status(400)
        .json({ success: false, message: "old password not correct!" });

    //hash the new passwrod
    const salt = await bcrypt.genSalt(10);
    const hashNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashNewPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "password changed successfully." });
  } catch (error) {
    console.log("error in changePassword controller:->", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//check home page
const homePage = (req, res) => {
  try {
    const { username } = req.userInfo;
    res.status(200).json({
      message: "welcome to home page,",
      username,
    });
  } catch (e) {
    console.log("error in homePage: -> ", e.message);
    res.status(500).json({ success: false, error: "internal server error" });
  }
};

const adminPage = (req, res) => {
  res.json({ message: "welcome to admin page" });
};
module.exports = {
  userRegister,
  userLogin,
  changePassword,
  homePage,
  adminPage,
};
