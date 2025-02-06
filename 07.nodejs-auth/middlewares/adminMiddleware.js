const adminMiddleware = (req, res, next) => {
  if (req.userInfo.role !== "admin")
    return res
      .status(403)
      .json({
        success: false,
        message: "access denied! admin only can visit this route.",
      });

      next()
};

module.exports = adminMiddleware;
