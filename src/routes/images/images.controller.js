const { saveImageToFirebase } = require("../../models/images/images.model");

async function httpAddNewImage(req, res) {
  const image = req.file;
  if (!image) {
    console.log("no image");
    return res.status(400).json({ error: "no image" });
  }
  try {
    const savedImageUrl = await saveImageToFirebase(image);
    return res.status(201).json({ savedImageUrl });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "couldn't save image. Something went wrong" });
  }
}

module.exports = {
  httpAddNewImage,
};
