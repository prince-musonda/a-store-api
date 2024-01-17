const firebaseConfig = require("./firebase.config");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

// initialize firebase
initializeApp(firebaseConfig);
const firebaseStorage = getStorage();

// function for adding an image to our firebase storage
async function saveImageToFirebase(file) {
  // creating a reference( a path and name) for our file(image)
  const imageRef = ref(
    firebaseStorage,
    `images/${Date.now()}${file.originalname}`
  );

  //setting meta data for our image
  const metaData = {
    "content-type": file.mimetype,
  };

  try {
    // upload to firebase
    await uploadBytes(imageRef, file.buffer, metaData);
    //return url of where the image(file) is stored
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

module.exports = {
  saveImageToFirebase,
};
