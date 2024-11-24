const jwt = require("jsonwebtoken");
const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      message: "Unauthorized, JWT token is required",
      //success: false,
    });
  }
  try {
    //decrypt and check expiry
    const decooded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Unauthorized, JWT token is wrong or expired",
      //success: false,
    });
  }
  res.redirect("/login");
};

module.exports = { ensureAuthenticated };
