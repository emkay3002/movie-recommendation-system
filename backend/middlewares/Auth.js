const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  console.log("Authorization Header:", auth);

  if (!auth) {
    return res.status(403).json({
      message: "Unauthorized, JWT token is required",
    });
  }

  try {
    const token = auth.split(" ")[1]; // Extract token after 'Bearer'
    if (!token) {
      return res.status(403).json({
        message: "Unauthorized, JWT token is missing",
      });
    }

    // Decrypt and check expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Pass only the token, not the full header
    req.user = decoded; // Attach the decoded user payload to `req.user`
    console.log("Decoded Token:", decoded);
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(403).json({
      message: "Unauthorized, JWT token is wrong or expired",
    });
  }
};

module.exports = { ensureAuthenticated };
