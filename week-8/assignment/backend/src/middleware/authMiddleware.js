const jwt = require("jsonwebtoken");

// Protects routes that require a logged-in user.
// Expects: Authorization: Bearer <token>
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token and attach decoded user info to the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, iat, exp }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = { protect };
