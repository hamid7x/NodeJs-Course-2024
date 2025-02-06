const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ success: false, error: "unauthorized, you are not loged in" });

    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedTokenInfo)
      return res
        .status(401)
        .json({ success: false, error: "unauthorized, you are not loged in" });

    req.userInfo = decodedTokenInfo;

    next();
  } catch (e) {
    console.log("error in isAuthMiddleware: ->", e.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = authMiddleware;
