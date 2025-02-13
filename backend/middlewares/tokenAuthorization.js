//JSON web token library import
const jwt = require("jsonwebtoken");

function tokenAuthorization(req, res, next) {
  //Extracting token header from the request
  const tokenHeader = req.headers["authorization"];
  //Token is missing from the request
  if (!tokenHeader) {
    return res.status(403).json({ error: "Authorization token is missing" });
  }

  //Extracting just needed part of the token
  const token = tokenHeader.split(" ")[1];

  try {
    //Verifying token validity by decoding it with secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //Saving decoded user id for later use in calling function
    req.user_id = decoded.id;
    //Next middleware control
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

//Authorization function export
module.exports = { tokenAuthorization };
