const express = require("express");
const multer = require("multer");
const { httpAddNewImage } = require("./images.controller");
//setting up multer for parsing incoming images(files)
const upload = multer({ storage: multer.memoryStorage() });

const imagesRouter = express.Router();

imagesRouter.post("/", upload.single("image"), httpAddNewImage);

module.exports = imagesRouter;
