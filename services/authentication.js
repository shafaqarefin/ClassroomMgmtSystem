require("dotenv").config();
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
function setTokenForUser(user) {
  const payload = {
    id: user._id,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);

  return token;
}

function getUserFromToken(token) {
  const userInfo = JWT.verify(token, secret);
  console.log(userInfo);
  return userInfo;
}

module.exports = { setTokenForUser, getUserFromToken };
