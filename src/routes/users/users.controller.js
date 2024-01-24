const bcrpty = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/users/users.model");

function generateToken(user) {
  const token = jwt.sign(
    {
      phone: user.phone,
    },
    process.env.SECRET
  );
  return token;
}

async function httpSignUpNewUser(req, res) {
  const { firstName, lastName, phone, password } = req.body;
  // check if user has provided all information
  if (!firstName || !lastName || !phone || !password) {
    console.log(req.body);
    return res.status(400).json({
      success: false,
      message: "please provide your names, phone number and password",
    });
  }
  //check if user doesn't exist
  try {
    const userAlreadyExists = await User.findOne({ phone: phone });
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "An account already exists with that phone number",
      });
    }
    //ELSE
    // hash password and create a new user
    const hashedPassword = await bcrpty.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      phone,
      password: hashedPassword,
    });
    const token = generateToken(user);
    return res.status(201).json({
      success: true,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
}

async function httpSignInUser(req, res) {
  const { phone, password } = req.body;
  try {
    // check if user exists
    const user = await User.findOne({ phone: phone });
    if (user) {
      const isPasswordCorrect = await bcrpty.compare(password, user.password);
      if (isPasswordCorrect) {
        const token = generateToken(user);
        return res.status(200).json({
          success: true,
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            token: token,
          },
        });
      }
    }
    //ELSE
    // when user doesn't exist or password is invalid
    return res
      .status(400)
      .json({ success: false, message: "Invalid Login credentials" });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
}

module.exports = {
  httpSignUpNewUser,
  httpSignInUser,
};
