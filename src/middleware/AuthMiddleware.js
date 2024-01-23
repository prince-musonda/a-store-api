const jwt = require("jsonwebtoken");
const Users = require("../models/users/users.model");
async function protected(req, res, next) {
  // get users token
  // Authorization headers usually start with the word "Bearer" then
  // followed by the "token"
  // so we will turn the entire header into an array using(split) and
  // get the second element which will be the token
  const usersAuthToken = req.headers.authorization.split(" ")[1];
  // check if user hasn't provided token
  if (!usersAuthToken) {
    return res
      .status(401)
      .json({ success: false, message: "you are not authenticticated" });
  }

  // when user has provided a token
  let isTokenValid;
  try {
    //check if token is valid. if not valid, the varify function method throws an error
    jwt.verify(usersAuthToken, process.env.SECRET);
  } catch {
    // when token is invalid
    return res.status(401).json({
      success: false,
      message:
        " Invalid token. You are not authenticated! Please login into your account",
    });
  }

  // when users token is valid
  const usersPhoneNumber = jwt.decode(usersAuthToken)["phone"];
  try {
    // get user from database but exclude password, _id, and __v
    const user = await Users.findOne({ phone: usersPhoneNumber }).select(
      "-password -_id -__v"
    );
    if (user) {
      req.user = user;
      return next();
    } else {
      // users account not found in databse
      // this could happen in a situation where the user has deleted their account
      // but still has access a valid token
      return res.status(400).json({
        success: false,
        message: "sorry, couldn't find your account. ",
      });
    }
  } catch (e) {
    // when something goes wrong while trying to retrieve users info from database
    res
      .status(500)
      .json({ success: false, message: "sorry, something went wrong" });
  }
}

module.exports = { protected };
