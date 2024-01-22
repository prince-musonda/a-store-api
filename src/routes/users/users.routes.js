const express = require("express");
const { httpSignUpNewUser, httpSignInUser } = require("./users.controller");

const usersRouter = express.Router();

usersRouter.post("/register", httpSignUpNewUser);
usersRouter.post("/login", httpSignInUser);

module.exports = usersRouter;
