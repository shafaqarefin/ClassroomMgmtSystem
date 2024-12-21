const JWT = require("jsonwebtoken");

let secret; //create your own key
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
