const jwt = require("jsonwebtoken");

const checkauth = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }
  try {
    //token lai split garne
    token = token.split(" ")[1];
    const decodetoken = jwt.verify(token, process.env.JWT_SECERT_KEY);
    req.id = decodetoken.id;
    console.log(decodetoken.id); // verify
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      message: "Token is not valid",
    });
  }
};

module.exports = checkauth;
